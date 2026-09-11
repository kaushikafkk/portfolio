/**
 * Central manifest for every image in the MKS asset pack.
 *
 * Files live in `public/assets/` so they are served by path and never bundled.
 * Vite rewrites nothing here — use `asset('01_Hero/hero_background.jpg')` or the
 * named exports below.
 *
 * Notes on the pack itself:
 *  - `Existing_Generated/` holds the full-resolution renders. Anything shown at
 *    a large size on the page comes from here.
 *  - The numbered folders (01_Hero … 12_Contact) are small presentation crops
 *    lifted from an asset board (90-430px). Sharp enough for small icons; too
 *    low-resolution for anything shown at section scale, so section background
 *    washes are drawn as CSS gradients in the components instead of images.
 *  - `Derived/` is generated from the pack: the cut-out statue used in the hero
 *    parallax and square-cropped versions of the icon crops.
 */

const BASE = './assets/';

export const asset = (p) => `${BASE}${p}`;

/* ------------------------------------------------------------------ global */
export const GLOBAL = {
  logo: asset('Global/logo_mks.png'),
  gridPattern: asset('Global/grid_pattern.png'),
  particleDots: asset('Global/particle_dots.png'),
  backgroundGradient: asset('Global/background_gradient.png'),
  cardBackground: asset('Global/card_background.png'),
  sectionDivider: asset('Global/section_divider.png'),
  marbleTexture: asset('Global/marble_texture.jpg'),
  buttonArrow: asset('Global/button_arrow.png'),
  iconSet: asset('Global/icon_set.png'),
  preloader: asset('Global/preloader.gif'),
  noise: asset('11_Philosophy/noise_texture.png'),
};

/* -------------------------------------------------------------------- hero */
export const HERO = {
  hall: asset('Existing_Generated/hero/museum_background.jpg'),
  statue: asset('Derived/thinking_statue_large.png'),
  statueThumb: asset('01_Hero/thinking_statue.png'),
  background: asset('01_Hero/hero_background.jpg'),
  columns: asset('01_Hero/hero_columns.png'),
  lightRays: asset('01_Hero/hero_light_rays.png'),
  floorReflection: asset('01_Hero/hero_floor_reflection.png'),
  reference: asset('Existing_Generated/hero/hero_portfolio_reference.jpg'),
};

/* ------------------------------------------------------------------- about */
export const ABOUT = {
  portrait: asset('Existing_Generated/about/profile_portrait.jpg'),
  portraitSmall: asset('02_About/profile_image.jpg'),
  signature: asset('02_About/profile_decor.png'),
  background: asset('02_About/about_background.jpg'),
  pattern: asset('02_About/about_pattern.png'),
};

/* -------------------------------------------------------------- experience */
export const EXPERIENCE = {
  hall: asset('Existing_Generated/experience/experience_visual.jpg'),
  background: asset('03_Experience/experience_background.png'),
  wave: asset('03_Experience/experience_wave.png'),
  grid: asset('03_Experience/experience_grid.png'),
  cardBg: asset('03_Experience/experience_card_bg.png'),
};

/* ---------------------------------------------------------------- projects */
export const PROJECTS_MEDIA = {
  model3d: asset('Existing_Generated/projects/architectural_3d_model.jpg'),
  fileUi: asset('Existing_Generated/projects/file_collaboration_ui.jpg'),
  modelSmall: asset('04_Projects/project_01_3d_model.png'),
  floorPlan: asset('04_Projects/project_01_plan.png'),
  wireframe: asset('04_Projects/project_01_wireframe.png'),
  fileUiSmall: asset('04_Projects/project_02_file_ui.png'),
};

/* ------------------------------------------------------------------- ai/ml */
export const AIML = {
  reference: asset('Existing_Generated/ai/ai_section_reference.jpg'),
  pipelineBackground: asset('05_AI_ML/ai_pipeline_background.png'),
};

/* ------------------------------------------------------------------- stack */
export const STACK_MEDIA = {
  reference: asset('Existing_Generated/stack/stack_reference.jpg'),
  background: asset('06_Engineering_Stack/stack_background.png'),
  diagram: asset('06_Engineering_Stack/stack_diagram.png'),
};

/* ------------------------------------------------------------ architecture */
export const ARCHITECTURE = {
  reference: asset('Existing_Generated/architecture/architecture_section_reference.jpg'),
  background: asset('07_Architecture/architecture_background.png'),
  elements: asset('07_Architecture/architecture_elements.png'),
  diagram: asset('07_Architecture/system_architecture_diagram.png'),
};

/* --------------------------------------------------------------- cloud/ops */
export const DEVOPS = {
  visual: asset('Existing_Generated/devops/devops_visual.jpg'),
  cloudNetwork: asset('08_Cloud_DevOps/cloud_network.png'),
  serverRoom: asset('08_Cloud_DevOps/server_room.png'),
  systemStatus: asset('08_Cloud_DevOps/system_status.png'),
  deploymentPipeline: asset('08_Cloud_DevOps/deployment_pipeline.png'),
  technologyIcons: asset('08_Cloud_DevOps/technology_icons.png'),
};

/* ------------------------------------------------------------ achievements */
export const ACHIEVEMENT_ICONS = {
  trophy: asset('Derived/icons/trophy.png'),
  medal: asset('Derived/icons/medal.png'),
  certificate: asset('Derived/icons/certificate.png'),
  code: asset('Derived/icons/code.png'),
  rawTrophy: asset('09_Achievements/achievement_trophy.png'),
  rawMedal: asset('09_Achievements/achievement_medal.png'),
  rawCertificate: asset('09_Achievements/achievement_certificate.png'),
  rawCode: asset('09_Achievements/achievement_code.png'),
};

/* ---------------------------------------------------------------- learning */
export const LEARNING_ICONS = {
  aws: asset('Derived/icons/aws.png'),
  cka: asset('Derived/icons/cka.png'),
  gcp: asset('Derived/icons/gcp.png'),
  terraform: asset('Derived/icons/terraform.png'),
};

/* -------------------------------------------------------------- philosophy */
export const PHILOSOPHY = {
  background: asset('11_Philosophy/philosophy_background.jpg'),
  divider: asset('11_Philosophy/quote_divider.png'),
  noise: asset('11_Philosophy/noise_texture.png'),
};

/* ----------------------------------------------------------------- contact */
export const CONTACT_MEDIA = {
  background: asset('12_Contact/contact_background.jpg'),
  socialIcons: asset('12_Contact/social_icons.png'),
  arrow: asset('12_Contact/arrow_icon.png'),
};

/* --------------------------------------------------------------- reference */
/** Design references — not rendered on the page, kept for the design archive. */
export const REFERENCE = {
  fullPortfolio: asset('Reference/full_portfolio_reference.jpg'),
  assetSheet: asset('Reference/generated_asset_sheet_full.jpg'),
  sheet01: asset('Existing_Generated/reference/asset_sheet_01.jpg'),
  sheet02: asset('Existing_Generated/reference/asset_sheet_02.jpg'),
  layout: asset('Existing_Generated/reference/full_page_layout_reference.jpg'),
  variant: asset('Existing_Generated/reference/portfolio_variant.jpg'),
  user01: asset('Existing_Generated/reference/user_reference_01.jpg'),
  user02: asset('Existing_Generated/reference/user_reference_02.jpg'),
};

/** Everything the hero needs before the curtain lifts. */
export const CRITICAL_IMAGES = [HERO.hall, HERO.statue, ABOUT.portrait];
