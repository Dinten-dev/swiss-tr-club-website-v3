<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Shop;

/** Standard WooCommerce order workflow; accounting stays with the club. */
final class InvoiceGateway extends \WC_Payment_Gateway
{
    public function __construct()
    {
        $this->id='strc_invoice';$this->method_title='STRC Rechnung';$this->method_description='Bestellung auf Rechnung mit manueller Zahlungsabstimmung.';$this->has_fields=false;
        $this->form_fields=['enabled'=>['title'=>'Aktivieren','type'=>'checkbox','label'=>'Rechnung anbieten','default'=>'yes'],'title'=>['title'=>'Titel','type'=>'text','default'=>'Rechnung'],'description'=>['title'=>'Beschreibung','type'=>'textarea','default'=>'Die Zahlungsinformationen erhalten Sie vom Club.']];
        $this->init_settings();$this->enabled=$this->get_option('enabled','yes');$this->title=$this->get_option('title','Rechnung');$this->description=$this->get_option('description','Die Zahlungsinformationen erhalten Sie vom Club.');if(get_locale()==='fr_FR'){$this->title='Facture';$this->description='Les informations de paiement vous seront envoyées par le club.';}
        add_action('woocommerce_update_options_payment_gateways_'.$this->id,[$this,'process_admin_options']);
    }
    public function process_payment($order_id)
    {
        $order=wc_get_order($order_id);if(!$order)return ['result'=>'failure'];
        if(!in_array($order->get_status(),['pending','failed'],true))return ['result'=>'success','redirect'=>$this->get_return_url($order)];
        $order->update_status('on-hold','Bestellung auf Rechnung; Zahlung wird separat abgestimmt.');
        wc_reduce_stock_levels($order_id);if(WC()->cart)WC()->cart->empty_cart();
        return ['result'=>'success','redirect'=>$this->get_return_url($order)];
    }
}
