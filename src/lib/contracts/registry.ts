/**
 * Structural definition for a single navigation item in the dashboard.
 */
export interface NavEntrySpec {
  id: string;
  label: string;
  path: string;
  icon?: string;
  parentId?: string;
  order?: number;
  requiredPermissionId?: string;
  businessContexts?: string[];
}

/**
 * Interface for a generic module contract.
 * Note: This will be refined as the module system is implemented.
 */
export interface ModuleContract {
  id: string;
  name: string;
  routes?: RouteSpec[];
  permissions?: string[];
}

/**
 * Definition for a specific route provided by a module.
 */
export interface RouteSpec {
  path: string;
  component?: string;
}

/**
 * Maps a module to its primary dashboard entry point.
 */
export interface ModuleRouteAffordance {
  moduleKey: string;
  path: string;
}

/**
 * Definition for a theme configuration.
 */
export interface ThemeSpec {
  id: string;
  name: string;
  colors?: Record<string, string>;
  logoUrl?: string;
}

/**
 * A preset defines a bundle of modules and a default theme for a business type.
 */
export interface PresetSpec {
  id: string;
  name: string;
  enabledModuleKeys: string[];
  themeId: string;
}

/**
 * The master context object tracking the state of the active tenant.
 */
export interface RegistrySnapshot {
  timestamp: number;
  activePresetId: string;
  activeThemeId?: string;
  navigation: NavEntrySpec[];
  navigationOverrides?: Record<string, Partial<NavEntrySpec>>;
  activeBusinessContexts?: string[];
  enabledPlugins?: string[];
  vocabularyProfile?: any;
  modules: Record<string, ModuleContract>;
  aliases: Record<string, string>;
  routes: any[];
  permissions: Record<string, { description: string; moduleId: string }>;
  themes: Record<string, ThemeSpec>;
  presets: Record<string, PresetSpec>;
  // Runtime extension fields
  moduleRouteIndex?: ModuleRouteAffordance[];
  enabledModules?: string[];
  activeTenantKey?: string;
  featureDefinitions?: any[];
  optionDefinitions?: any[];
  pluginDefinitions?: any[];
  enabledFeatures?: string[];
  enabledOptions?: string[];
}
