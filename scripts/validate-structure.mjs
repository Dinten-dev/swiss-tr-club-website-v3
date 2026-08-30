import { readFileSync, existsSync } from 'node:fs';

const required = [
  'compose.yaml',
  'frontend/app/page.tsx',
  'frontend/public/models/triumph-tr6.glb',
  'wordpress/wp-content/plugins/strc-core/strc-core.php',
  'wordpress/wp-content/plugins/strc-core/src/Content/ContentPostTypes.php',
  'wordpress/wp-content/plugins/strc-core/src/Admin/ClubManagementPage.php',
  'wordpress/wp-content/plugins/strc-core/src/Finance/CamtImporter.php',
  'wordpress/wp-content/plugins/strc-core/src/Finance/QrInvoicePdf.php',
  'wordpress/wp-content/plugins/strc-core/src/Infrastructure/Schema.php',
  'wordpress/wp-content/plugins/strc-core/src/Members/MemberCsvImporter.php',
  'wordpress/wp-content/plugins/strc-core/src/Members/MembershipAccessGuard.php',
  'wordpress/wp-content/plugins/strc-core/src/Members/MembershipTypePolicy.php',
  'wordpress/wp-content/plugins/strc-core/src/Members/MemberActivationMailer.php',
  'wordpress/wp-content/themes/strc/theme.json',
  'wordpress/wp-content/themes/strc/templates/index.html',
];

for (const path of required) {
  if (!existsSync(path)) throw new Error(`Fehlende Datei: ${path}`);
}

JSON.parse(readFileSync('wordpress/wp-content/themes/strc/theme.json', 'utf8'));
JSON.parse(readFileSync('wordpress/wp-content/plugins/strc-core/composer.json', 'utf8'));

const roles = readFileSync('wordpress/wp-content/plugins/strc-core/src/Roles/RoleDefinitions.php', 'utf8');
for (const role of ['strc_member', 'strc_editor', 'strc_administrator', 'strc_developer']) {
  if (!roles.includes(`'${role}'`)) throw new Error(`Fehlende Rolle: ${role}`);
}

for (const capability of ['publish_strc_ads', 'publish_strc_topics', 'publish_posts', 'publish_strc_events', 'publish_strc_drives', 'strc_manage_members', 'strc_manage_finance', 'strc_send_bulk_mail']) {
  if (!roles.includes(`'${capability}'`)) throw new Error(`Fehlende Berechtigung: ${capability}`);
}

const frontend = readFileSync('frontend/app/page.tsx', 'utf8');
if (/Demo|Prototyp|synthetischen Daten/i.test(frontend)) {
  throw new Error('Frontend enthält noch Entwicklungskennzeichnungen.');
}

console.log('STRC-Strukturprüfung: PASS');
