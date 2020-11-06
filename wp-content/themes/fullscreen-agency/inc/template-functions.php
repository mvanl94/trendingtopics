<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

/*-----------------------------------------------------------------------------------------------------------------------------------*/

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function fullscreen_agency_pingback_header() {
	if ( is_singular() && pings_open() ) {
		echo '<link rel="pingback" href="', esc_url( get_bloginfo( 'pingback_url' ) ), '">';
	}
}
add_action( 'wp_head', 'fullscreen_agency_pingback_header' );

/*-----------------------------------------------------------------------------------------------------------------------------------*/

if ( ! function_exists( 'fullscreen_agency_fonts_url' ) ) :

	/**
	 * Register Google fonts for Fullscreen Agency.
	 *
	 * @return string Google fonts URL for the theme.
	 * @since 1.0.0
	 */

    function fullscreen_agency_fonts_url() {

        $fonts_url = '';
        $font_families = array();

        /*
         * Translators: If there are characters in your language that are not supported
         * by Lora translate this to 'off'. Do not translate into your own language.
         */
        if ( 'off' !== _x( 'on', 'Lora font: on or off', 'fullscreen-agency' ) ) {
            $font_families[] = 'Lora:400,700';
        }

        /*
         * Translators: If there are characters in your language that are not supported
         * by Poppins, translate this to 'off'. Do not translate into your own language.
         */
        if ( 'off' !== _x( 'on', 'Poppins font: on or off', 'fullscreen-agency' ) ) {
            $font_families[] = 'Poppins:300,400,400i,500,700';
        }   

        if( $font_families ) {
            $query_args = array(
                'family' => urlencode( implode( '|', $font_families ) ),
                'subset' => urlencode( 'latin,latin-ext' ),
            );

            $fonts_url = add_query_arg( $query_args, 'https://fonts.googleapis.com/css' );
        }

        return $fonts_url;
    }

endif;

/*-----------------------------------------------------------------------------------------------------------------------------------*/
/**
 * Enqueue scripts and styles for only admin
 *
 * @since 1.0.0
 */
add_action( 'admin_enqueue_scripts', 'fullscreen_agency_admin_scripts' );

function fullscreen_agency_admin_scripts( $hook ) {

    global $fullscreen_agency_theme_version;

    if( 'widgets.php' != $hook && 'customize.php' != $hook && 'edit.php' != $hook && 'post.php' != $hook && 'post-new.php' != $hook ) {
        return;
    }

    wp_enqueue_script( 'jquery-ui-button' );
    
    wp_enqueue_script( 'fullscreen-agency--admin-script', get_template_directory_uri() .'/assets/js/cv-admin-scripts.js', array( 'jquery' ), esc_attr( $fullscreen_agency_theme_version ), true );

    wp_enqueue_style( 'fullscreen-agency--admin-style', get_template_directory_uri() . '/assets/css/cv-admin-styles.css', array(), esc_attr( $fullscreen_agency_theme_version ) );
}

/*---------------------------------------------------------------------------------------------------------------------------------*/
/**
 * Enqueue scripts and styles.
 */
function fullscreen_agency_scripts() {

	global $fullscreen_agency_theme_version;

	wp_enqueue_style( 'fullscreen-agency', fullscreen_agency_fonts_url(), array(), null );

    wp_enqueue_style( 'fullscreen-agency-fullpage-css', get_template_directory_uri() . '/assets/library/fullpage/fullpage.min.css', array(), '3.0.4' );

    wp_enqueue_style( 'font-awesome', get_template_directory_uri().'/assets/library/font-awesome/css/font-awesome.min.css', array(), '5.6.1' );

    wp_enqueue_style( 'animate', get_template_directory_uri(). '/assets/library/animate/animate.min.css', array(), '1.3.0' );

	wp_enqueue_style( 'fullscreen-agency-style', get_stylesheet_uri(), array(), esc_attr( $fullscreen_agency_theme_version ) );

    wp_enqueue_style( 'responsive-style', get_template_directory_uri() .'/assets/css/responsive.css', array(), esc_attr( $fullscreen_agency_theme_version ) );

    wp_enqueue_script( 'fullscreen-agency-combine-scripts', get_template_directory_uri() .'/assets/js/cv-combine-scripts.js', array('jquery'), esc_attr( $fullscreen_agency_theme_version ), true );

	wp_enqueue_script( 'fullscreen-agency-navigation', get_template_directory_uri() . '/assets/js/navigation.js', array(), '20151215', true );

	//wp_enqueue_script( 'fullscreen-agency-skip-link-focus-fix', get_template_directory_uri() . '/assets/js/skip-link-focus-fix.js', array(), '20151215', true );

    wp_enqueue_script( 'fullscreen-agency-custom-js', get_template_directory_uri() . '/assets/js/cv-custom-scripts.js', array('jquery'), esc_attr( $fullscreen_agency_theme_version ), true );

    $fullscreen_agency_enable_wow_animation = get_theme_mod( 'fullscreen_agency_enable_wow_animation', true );
    if( true === $fullscreen_agency_enable_wow_animation ) {
        $wow_value = 'on';
    } else {
        $wow_value = 'off';
    }

    wp_localize_script( 'fullscreen-agency-custom-js', 'fullscreenagencyObject', array(
        'wow_effect'     => $wow_value
    ) );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'fullscreen_agency_scripts' );

/*--------------------------------------------------------------------------------------------------------------------------------*/

if( ! function_exists( 'fullscreen_agency_select_categories_list' ) ) :

    /**
     * function to return category lists
     *
     * @return $fullscreen_agency_categories_list in array
     */
    
    function fullscreen_agency_select_categories_list() {

        $fullscreen_agency_get_categories = get_categories( array( 'hide_empty' => 0 ) );
        $fullscreen_agency_categories_list[''] = __( 'Select Category', 'fullscreen-agency' );

        foreach ( $fullscreen_agency_get_categories as $category ) {
            $fullscreen_agency_categories_list[esc_attr( $category->slug )] = esc_html( $category->cat_name );
        }
        
        return $fullscreen_agency_categories_list;
    }

endif;

/*--------------------------------------------------------------------------------------------------------------------------------*/

if( ! function_exists( 'fullscreen_agency_select_page_list' ) ) :

    /**
     * function to return page lists
     *
     * @return $fullscreen_agency_page_list in array
     */
    
    function fullscreen_agency_select_page_list() {

        $fullscreen_agency_get_pages = get_pages();
        $fullscreen_agency_page_list[''] = __( 'Select Page', 'fullscreen-agency' );

        foreach ( $fullscreen_agency_get_pages as $page ) {
            $fullscreen_agency_page_list[esc_attr( $page->post_name )] = esc_html( $page->post_title );
        }
        
        return $fullscreen_agency_page_list;
    }

endif;

/*---------------------------------------------------------------------------------------------------------------------------------*/
if ( ! function_exists( 'fullscreen_agency_inner_header_bg_image' ) ) :

    /**
     * Background image for inner page header
     *
     * @since 1.0.0
     */

    function fullscreen_agency_inner_header_bg_image( $input ) {

        $image_attr = array();

        if ( empty( $image_attr ) ) {

            // Fetch from Custom Header Image.
            $image = get_header_image();
            if ( ! empty( $image ) ) {
                $image_attr['url']    = $image;
                $image_attr['width']  = get_custom_header()->width;
                $image_attr['height'] = get_custom_header()->height;
            }
        }

        if ( ! empty( $image_attr ) ) {
            $input .= 'background:url(' . esc_url( $image_attr['url'] ) . ') no-repeat fixed center center/cover;';
        }

        return $input;
    }

endif;

add_filter( 'fullscreen_agency_inner_header_style_attribute', 'fullscreen_agency_inner_header_bg_image' );

/*----------------------------------------------------------------------------------------------------------------------------------------*/

if( ! function_exists( 'fullscreen_agency_is_sidebar_layout' ) ) :

    /**
     * Checks if the current page matches the given layout
     *
     * @return string $layout layout of current page.
     */

    function fullscreen_agency_is_sidebar_layout() {

        global $post;
        $layout = '';

        if ( is_archive() || is_home() ) {
            $layout = get_theme_mod( 'fullscreen_agency_archive_sidebar_layout', 'no-sidebar' );
        } elseif ( is_single() ) {
            $single_post_layout = get_post_meta( $post->ID, 'fullscreen_agency_post_sidebar_layout', true );
            if ( 'layout--default-sidebar' !== $single_post_layout ) {
                $layout = $single_post_layout;
            } else {
                $layout = get_theme_mod( 'fullscreen_agency_posts_sidebar_layout', 'right-sidebar' );
            }
        } elseif ( is_page() ) {
            $single_page_layout = get_post_meta( $post->ID, 'fullscreen_agency_post_sidebar_layout', true );
            if ( 'layout--default-sidebar' !== $single_page_layout ) {
                $layout = $single_page_layout;
            } else {
                $layout = get_theme_mod( 'fullscreen_agency_pages_sidebar_layout', 'right-sidebar' );
            }
        }

        return $layout;
    }

endif;

/*-----------------------------------------------------------------------------------------------------------------------*/

if( ! function_exists( 'fullscreen_agency_css_strip_whitespace' ) ) :
    
    /**
     * Get minified css and removed space
     *
     * @since 1.0.0
     */

    function fullscreen_agency_css_strip_whitespace( $css ){
        $replace = array(
            "#/\*.*?\*/#s" => "",  // Strip C style comments.
            "#\s\s+#"      => " ", // Strip excess whitespace.
        );
        $search = array_keys( $replace );
        $css = preg_replace( $search, $replace, $css );

        $replace = array(
            ": "  => ":",
            "; "  => ";",
            " {"  => "{",
            " }"  => "}",
            ", "  => ",",
            "{ "  => "{",
            ";}"  => "}", // Strip optional semicolons.
            ",\n" => ",", // Don't wrap multiple selectors.
            "\n}" => "}", // Don't wrap closing braces.
            "} "  => "}\n", // Put each rule on it's own line.
        );
        $search = array_keys( $replace );
        $css = str_replace( $search, $replace, $css );

        return trim( $css );
    }

endif;

/*---------------------------------------------------------------------------------------------------------------*/
/**
 * Dynamic style file include
 *
 */
require get_template_directory() . '/inc/cv-dynamic-styles.php';


/*---------------------------------------------------------------------------------------------------------------*/

add_filter( 'wp_kses_allowed_html', 'fullscreen_agency_required_data_attributes' , 10, 4 );

if( ! function_exists( 'fullscreen_agency_required_data_attributes' ) ) :
    
    /**
     * Added required attributes while using wp_kses by using `wp_kses_allowed_html` filter.
     *
     * @since 1.0.6
     */
    function fullscreen_agency_required_data_attributes( $required_attributes, $context ) {

        $required_attributes['time']['class'] = true;
        $required_attributes['time']['datetime'] = true;

        return $required_attributes;
    }

endif;
