<?php

declare(strict_types=1);
namespace SwissTRClub\Core\Shop;

final class ShopAccessPolicy
{
    public const PRODUCT_CAPABILITIES = array(
        'edit_products', 'publish_products', 'read_private_products', 'delete_products',
        'upload_files', 'assign_product_terms', 'edit_product_terms',
        'manage_product_terms', 'delete_product_terms', 'edit_others_products','edit_published_products','delete_others_products','delete_published_products',
        'edit_shop_orders','edit_others_shop_orders','edit_published_shop_orders','read_private_shop_orders','publish_shop_orders','manage_woocommerce','view_woocommerce_reports',
    );

    public static function canManage(bool $administrator, bool $clubAdmin, bool $member, bool $moderator, array $areas): bool
    {
        return $administrator || $clubAdmin || ($member && $moderator && in_array('shop', $areas, true));
    }

    public static function canPurchase(bool $member, bool $zahlsReady, bool $invoiceReady=false): bool
    {
        return $zahlsReady || $invoiceReady;
    }

    public static function withProductCapabilities(array $capabilities, bool $canManage): array
    {
        if ($canManage) {
            foreach (self::PRODUCT_CAPABILITIES as $capability) {
                $capabilities[$capability] = true;
            }
        }
        return $capabilities;
    }
}
