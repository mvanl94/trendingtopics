<?php
/**
 * Fullscreen Agency manage the Customizer options of general panel.
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

// Toggle field for Enable/Disable wow animation.
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'toggle',
		'settings' => 'fullscreen_agency_enable_wow_animation',
		'label'    => esc_html__( 'Enable Wow Animation', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_site',
		'default'  => '1',
		'priority' => 5,
	)
);

// Toggle field for Show/Hide breadcrumb.
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'toggle',
		'settings' => 'fullscreen_agency_enable_breadcrumb_option',
		'label'    => esc_html__( 'Show Breadcrumb', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_section_site',
		'default'  => '1',
		'priority' => 5,
	)
);

// Color Picker field for Primary Color
Kirki::add_field( 
	'fullscreen_agency_config', array(
		'type'        => 'color',
		'settings'    => 'fullscreen_agency_primary_color',
		'label'       => esc_html__( 'Primary Color', 'fullscreen-agency' ),
		'section'     => 'colors',
		'default'     => '#ff58a5',
	)
);

// Checkbox field to control latest posts in homepage
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'        => 'checkbox',
		'settings'    => 'fullscreen_agency_home_posts',
		'label'       => esc_attr__( 'Checked to hide latest posts in homepage.', 'fullscreen-agency' ),
		'section'     => 'static_front_page',
		'default'     => false,
	)
);
