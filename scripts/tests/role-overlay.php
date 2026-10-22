<?php
/** Candidate roles in request memory only; never migrate real role definitions during QA. */
if(!defined('WP_CLI')||!WP_CLI||wp_get_environment_type()!=='staging')throw new RuntimeException('Isolated WP-CLI staging QA only');
global$wpdb,$wp_roles;
$qaRoleOption=$wpdb->prefix.'user_roles';$qaRoles=get_option($qaRoleOption);
foreach(SwissTRClub\Core\Roles\RoleDefinitions::all()as$slug=>$definition)$qaRoles[$slug]=['name'=>$definition['name'],'capabilities'=>$definition['capabilities']];
foreach(array_keys(SwissTRClub\Core\Roles\RoleDefinitions::operationalCapabilities())as$cap)if(str_starts_with($cap,'strc_')||str_contains($cap,'_strc_'))unset($qaRoles['administrator']['capabilities'][$cap]);
unset($qaRoles['administrator']['capabilities']['strc_access_board_documents']);$qaRoles['administrator']['capabilities']+=SwissTRClub\Core\Roles\RoleDefinitions::platformCapabilities();
add_filter('pre_option_'.$qaRoleOption,static fn()=>$qaRoles);
add_filter('pre_update_option_'.$qaRoleOption,static fn($new,$old)=>$old,10,2);
add_filter('pre_option_strc_roles_before_20261021',static fn()=>['qa'=>true]);
$wp_roles=new WP_Roles();
