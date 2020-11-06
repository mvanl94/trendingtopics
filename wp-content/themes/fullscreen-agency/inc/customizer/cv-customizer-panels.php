<?php
/**
 * Fullscreen Agency manage the Customizer panels.
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

/**
 * General Settings Panel
 */
Kirki::add_panel( 'fullscreen_agency_general_panel', array(
	'priority' => 10,
	'title'    => esc_html__( 'General Settings', 'fullscreen-agency' ),
) );

/**
 * Header Settings Panel
 */
Kirki::add_panel( 'fullscreen_agency_header_panel', array(
	'priority' => 15,
	'title'    => esc_html__( 'Header Settings', 'fullscreen-agency' ),
) );

/**
 * Frontpage Settings Panel
 */
Kirki::add_panel( 'fullscreen_agency_frontpage_panel', array(
	'priority' => 20,
	'title'    => esc_html__( 'Frontpage Settings', 'fullscreen-agency' ),
) );

/**
 * Design Settings Panel
 */
Kirki::add_panel( 'fullscreen_agency_design_panel', array(
	'priority' => 25,
	'title'    => esc_html__( 'Design Settings', 'fullscreen-agency' ),
) );