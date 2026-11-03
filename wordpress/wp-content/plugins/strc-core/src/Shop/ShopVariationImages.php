<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Shop;

/**
 * Bildwechsel auf der Artikelseite schon bei Teilauswahl (Wunsch Redaktion 2.11.2026):
 * - Farbe gewählt → Bild der Farbe (Leitmerkmal), auch wenn Logo-Position und Grösse noch fehlen.
 * - Weiteres Merkmal mit Kombinationsbild gewählt (z. B. Ärmel) → Bild «Ärmel · Navy» passend zur gewählten Farbe.
 * Sind alle Merkmale gewählt, setzt WooCommerce das gespeicherte Bild der Kombination wie bisher.
 * Bilder weiterer Merkmale ohne Kombinationsbild (z. B. Logoaufdruck beim Car-Pyjama) erscheinen nach der Wahl
 * als kleine Vorschau direkt unter dem Auswahlfeld.
 */
final class ShopVariationImages
{
    public function registerHooks(): void
    {
        add_action('woocommerce_before_variations_form', array($this, 'printData'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue'), 30);
    }

    /** Bilddaten des Artikels; null, wenn der Artikel keine Merkmalsbilder hat. */
    public static function data(\WC_Product $product): ?array
    {
        if (! $product->is_type('variable')) {
            return null;
        }
        $valueImages = (array) $product->get_meta('_strc_value_images');
        $comboImages = (array) $product->get_meta('_strc_combo_images');
        if (! $valueImages && ! $comboImages) {
            return null;
        }
        $attributes = array_values(array_filter($product->get_attributes(), static fn ($attribute) => $attribute->get_variation()));
        $fields = array();
        $lead = null;
        $values = array();
        $combo = array();
        $previews = array();
        foreach ($attributes as $index => $attribute) {
            $name = $attribute->get_name();
            $fields[] = 'attribute_' . sanitize_title($name);
            if ($lead === null && ! empty($valueImages[$name])) {
                $lead = $index;
                foreach ((array) $valueImages[$name] as $value => $id) {
                    $props = self::props((int) $id);
                    if ($props) {
                        $values[(string) $value] = $props;
                    }
                }
            }
            if ($index !== $lead && empty($comboImages[$name])) {
                foreach ((array) ($valueImages[$name] ?? array()) as $value => $id) {
                    $props = self::props((int) $id);
                    if ($props) {
                        $previews[$index][(string) $value] = $props;
                    }
                }
            }
            if ($index > 0) {
                foreach ((array) ($comboImages[$name] ?? array()) as $value => $row) {
                    foreach ((array) $row as $baseValue => $id) {
                        $props = self::props((int) $id);
                        if ($props) {
                            $combo[$index][(string) $value][(string) $baseValue] = $props;
                        }
                    }
                }
            }
        }
        if (! $values && ! $combo && ! $previews) {
            return null;
        }
        return array('fields' => $fields, 'lead' => $lead, 'values' => (object) $values, 'combo' => (object) $combo, 'previews' => (object) $previews);
    }

    private static function props(int $id): ?array
    {
        if ($id <= 0 || ! function_exists('wc_get_product_attachment_props')) {
            return null;
        }
        $props = wc_get_product_attachment_props($id);
        if (empty($props['src'])) {
            return null;
        }
        $props['id'] = $id;
        return $props;
    }

    public function printData(): void
    {
        global $product;
        if (! $product instanceof \WC_Product) {
            return;
        }
        $data = self::data($product);
        if ($data) {
            echo '<script type="application/json" class="strc-variation-images">' . wp_json_encode($data, JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE) . '</script>';
        }
    }

    public function enqueue(): void
    {
        if (! function_exists('is_product') || ! is_product()) {
            return;
        }
        wp_add_inline_script('wc-add-to-cart-variation', self::script());
    }

    public static function script(): string
    {
        return <<<'JS'
jQuery(function($){$('form.variations_form').each(function(){
var form=$(this),node=form.find('script.strc-variation-images'),data;if(!node.length)return;
try{data=JSON.parse(node.text());}catch(e){return;}
function value(i){return form.find('[name="'+data.fields[i]+'"]').val()||'';}
function pick(){var base=value(0);if(base)for(var i=1;i<data.fields.length;i++){var row=data.combo[i]&&data.combo[i][value(i)];if(row&&row[base])return row[base];}
if(data.lead!==null){var lead=value(data.lead);if(lead&&data.values[lead])return data.values[lead];}return null;}
function previews(){$.each(data.previews||{},function(i,images){var select=form.find('[name="'+data.fields[i]+'"]'),box=form.find('.strc-variation-preview[data-index="'+i+'"]'),chosen=value(i),image=chosen&&images[chosen];
if(!box.length){box=$('<div class="strc-variation-preview" aria-live="polite"></div>').attr('data-index',i).css({display:'flex',alignItems:'center',gap:'12px',marginTop:'10px'});select.after(box);}
box.empty();if(!image){box.hide();return;}
box.append($('<img alt="">').attr('src',image.gallery_thumbnail_src||image.src).css({width:'72px',height:'72px',objectFit:'contain',borderRadius:'6px',background:'#fff',border:'1px solid #d8e0e8'})).append($('<span></span>').text(chosen)).show();});}
form.on('woocommerce_variation_has_changed',previews);previews();
form.on('woocommerce_variation_has_changed',function(){if(form.find('input[name="variation_id"]').val())return;var image=pick();if(image&&form.wc_variations_image_update)form.wc_variations_image_update({image:image,image_id:image.id});});
});});
JS;
    }
}
