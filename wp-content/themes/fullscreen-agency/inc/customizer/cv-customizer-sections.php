<?php
/**
 * Fullscreen Agency manage the Customizer sections.
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

/**
 * Site Settings
 */
Kirki::add_section( 'fullscreen_agency_section_site', array(
	'title'    => esc_html__( 'Site Settings', 'fullscreen-agency' ),
	'panel'    => 'fullscreen_agency_general_panel',
	'priority' => 40,
) );


/**
 * Header Extra Options
 */
Kirki::add_section( 'fullscreen_agency_section_header_extra', array(
	'title'    => esc_html__( 'Extra Options', 'fullscreen-agency' ),
	'panel'    => 'fullscreen_agency_header_panel',
	'priority' => 20,
) );

/**
 * Hero Section
 */
Kirki::add_section( 'fullscreen_agency_section_hero_content', array(
	'title'    => esc_html__( 'Hero Section', 'fullscreen-agency' ),
	'panel'    => 'fullscreen_agency_frontpage_panel',
	'priority' => 5,
) );

/**
 * About Us Section
 */
Kirki::add_section( 'fullscreen_agency_section_about_us', array(
	'title'    => esc_html__( 'About Us Section', 'fullscreen-agency' ),
	'panel'    => 'fullscreen_agency_frontpage_panel',
	'priority' => 10,
) );

/**
 * Services Section
 */
Kirki::add_section( 'fullscreen_agency_section_services', array(
	'title'    => esc_html__( 'Services Section', 'fullscreen-agency' ),
	'panel'    => 'fullscreen_agency_frontpage_panel',
	'priority' => 15,
) );

/**
 * Portfolio Section
 */
Kirki::add_section( 'fullscreen_agency_section_portfolio', array(
	'title'    => esc_html__( 'Portfolio Section', 'fullscreen-agency' ),
	'panel'    => 'fullscreen_agency_frontpage_panel',
	'priority' => 20,
) );

/**
 * Testimonial Section
 */
Kirki::add_section( 'fullscreen_agency_section_testimonial', array(
	'title'    => esc_html__( 'Testimonial Section', 'fullscreen-agency' ),
	'panel'    => 'fullscreen_agency_frontpage_panel',
	'priority' => 25,
) );

/**
 * Blog Section
 */
Kirki::add_section( 'fullscreen_agency_section_blog', array(
	'title'    => esc_html__( 'Blog Section', 'fullscreen-agency' ),
	'panel'    => 'fullscreen_agency_frontpage_panel',
	'priority' => 35,
) );

/**
 * Contact Section
 */
Kirki::add_section( 'fullscreen_agency_section_contact', array(
	'title'    => esc_html__( 'Contact Section', 'fullscreen-agency' ),
	'panel'    => 'fullscreen_agency_frontpage_panel',
	'priority' => 40,
) );

/**
 * Archive Section
 */
Kirki::add_section( 'fullscreen_agency_section_archive_settings', array(
	'title'    => esc_html__( 'Archive Settings', 'fullscreen-agency' ),
	'panel'    => 'fullscreen_agency_design_panel',
	'priority' => 5,
) );

/**
 * Post Section
 */
Kirki::add_section( 'fullscreen_agency_section_post_settings', array(
	'title'    => esc_html__( 'Post Settings', 'fullscreen-agency' ),
	'panel'    => 'fullscreen_agency_design_panel',
	'priority' => 10,
) );

/**
 * Page Section
 */
Kirki::add_section( 'fullscreen_agency_section_page_settings', array(
	'title'    => esc_html__( 'Page Settings', 'fullscreen-agency' ),
	'panel'    => 'fullscreen_agency_design_panel',
	'priority' => 15,
) );

/**
 * Footer Settings
 */
Kirki::add_section( 'fullscreen_agency_footer_setting', array(
	'title'    => esc_html__( 'Footer Settings', 'fullscreen-agency' ),
	'priority' => 40,
) );