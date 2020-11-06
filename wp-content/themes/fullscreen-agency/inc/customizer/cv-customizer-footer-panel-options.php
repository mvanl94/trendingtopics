<?php
/**
 * Fullscreen Agency manage the Customizer options of footer panel.
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

// Textarea field for copyright text
Kirki::add_field(
	'fullscreen_agency_config', array(
		'type'     => 'textarea',
		'settings' => 'fullscreen_agency_footer_copyright',
		'label'    => esc_html__( 'Copyright Text', 'fullscreen-agency' ),
		'section'  => 'fullscreen_agency_footer_setting',
		'priority' => 5,
	)
);
