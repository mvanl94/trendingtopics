<?php
/**
 * Fullscreen Agency Theme Customizer
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function fullscreen_agency_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';

	$wp_customize->get_section( 'title_tagline' )->panel        = 'fullscreen_agency_general_panel';
    $wp_customize->get_section( 'title_tagline' )->priority     = '5';
    $wp_customize->get_section( 'colors' )->panel               = 'fullscreen_agency_general_panel';
    $wp_customize->get_section( 'colors' )->priority            = '10';
    $wp_customize->get_section( 'static_front_page' )->panel    = 'fullscreen_agency_general_panel';
    $wp_customize->get_section( 'static_front_page' )->priority = '20';

    $wp_customize->get_section( 'header_image' )->panel        = 'fullscreen_agency_header_panel';
    $wp_customize->get_section( 'header_image' )->priority     = '5';
    $wp_customize->get_section( 'header_image' )->title  	   = __( 'Innerpage Header Image', 'fullscreen-agency' );
    $wp_customize->remove_section('background_image');
    $wp_customize->remove_setting('background_color');

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial( 'blogname', array(
			'selector'        => '.site-title a',
			'render_callback' => 'fullscreen_agency_customize_partial_blogname',
		) );
		$wp_customize->selective_refresh->add_partial( 'blogdescription', array(
			'selector'        => '.site-description',
			'render_callback' => 'fullscreen_agency_customize_partial_blogdescription',
		) );
	}

	// Require upsell customizer section class.
	require get_template_directory() . '/inc/customizer/cv-customizer-upsell-class.php';

	/**
     * Register custom section types.
     *
     * @since 1.0.0
     */
	$wp_customize->register_section_type( 'Fullscreen_Agency_Customize_Section_Upsell' );

	/**
     * Register theme upsell sections.
     *
     * @since 1.0.0
     */
    $wp_customize->add_section( new Fullscreen_Agency_Customize_Section_Upsell(
        $wp_customize,
            'theme_upsell',
            array(
                'title'    => esc_html__( 'Fullscreen Agency Pro', 'fullscreen-agency' ),
                'pro_text' => esc_html__( 'Buy Pro', 'fullscreen-agency' ),
                'pro_url'  => 'https://codevibrant.com/wpthemes/fullscreen-agency-pro/',
                'priority'  => 5,
            )
        )
    );
}
add_action( 'customize_register', 'fullscreen_agency_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function fullscreen_agency_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function fullscreen_agency_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function fullscreen_agency_customize_preview_js() {
	wp_enqueue_script( 'fullscreen-agency-customizer', get_template_directory_uri() . '/assets/js/customizer.js', array( 'customize-preview' ), '20151215', true );
}
add_action( 'customize_preview_init', 'fullscreen_agency_customize_preview_js' );

/*--------------------------------------------------------------------------------------------------------------------------------------*/
/**
 * Enqueue required scripts/styles for customizer panel
 *
 * @since 1.0.0
 */
function fullscreen_agency_customize_backend_scripts() {

	global $fullscreen_agency_theme_version;

    wp_enqueue_style( 'fullscreen-agency-admin-customizer-style', get_template_directory_uri() . '/assets/css/cv-customizer-styles.css', array(), esc_attr( esc_attr( $fullscreen_agency_theme_version ) ) );
    
    wp_enqueue_script( 'fullscreen-agency-admin-customizer-script', get_template_directory_uri() . '/assets/js/cv-customizer-controls.js', array( 'jquery', 'customize-controls' ), esc_attr( $fullscreen_agency_theme_version ), true );

}
add_action( 'customize_controls_enqueue_scripts', 'fullscreen_agency_customize_backend_scripts', 10 );


/**
 * Add Kirki customizer library file
 */
require get_template_directory() . '/inc/kirki/kirki.php';

/**
 * Configuration for Kirki Framework
 */
function fullscreen_agency_kirki_configuration() {
	return array(
		'url_path' => get_template_directory_uri() . '/inc/kirki/',
	);
}

add_filter( 'kirki/config', 'fullscreen_agency_kirki_configuration' );


/**
 * Fullscreen agency Kirki Config
 */
Kirki::add_config( 'fullscreen_agency_config', array(
	'capability'  => 'edit_theme_options',
	'option_type' => 'theme_mod',
) );

/**
 * Add Kirki required file for custom fields
 */
require get_template_directory() . '/inc/customizer/cv-customizer-panels.php';
require get_template_directory() . '/inc/customizer/cv-customizer-sections.php';

require get_template_directory() . '/inc/customizer/cv-customizer-general-panel-options.php';
require get_template_directory() . '/inc/customizer/cv-customizer-header-panel-options.php';
require get_template_directory() . '/inc/customizer/cv-customizer-frontpage-panel-options.php';
require get_template_directory() . '/inc/customizer/cv-customizer-design-panel-options.php';
require get_template_directory() . '/inc/customizer/cv-customizer-footer-panel-options.php';