<?php
/**
 * Dynamic style for site theme color and primary color 
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 *
 */
add_action( 'wp_enqueue_scripts', 'fullscreen_agency_dynamic_styles' );
if( ! function_exists( 'fullscreen_agency_dynamic_styles' ) ) :
    /**
     * Fullscreen Agency Dynamic Styles
     *
     */
    function fullscreen_agency_dynamic_styles() { 
        $fullscreen_agency_primary_color = get_theme_mod( 'fullscreen_agency_primary_color', '#ea8296' );
        $output_css = '';

         $output_css .= ".widget a:hover,.widget a:hover::before,.widget li:hover::before,a:hover,a:hover::before, a:focus, a:active,.entry-footer a:hover,.archive .entry-title a:hover,.search .entry-title a:hover,.logged-in-as a,.front-latest-post .entry-title a:hover, #site-navigation .sub-menu li a:hover, .search .content-title, .required{color:".esc_attr( $fullscreen_agency_primary_color ).";}"; 

        $output_css .= ".widget_search .search-submit,.page .navigation .nav-links a, .page #submit, .page .reply .comment-reply-link, .single .navigation .nav-links a, .single #submit, .single .reply .comment-reply-link, .archive .navigation .nav-links a, .archive #submit, .archive .reply .comment-reply-link, .search-submit, .search .navigation .nav-links a, .comment-list .comment-body, .search .content-title{ border-color:".esc_attr( $fullscreen_agency_primary_color )."; }";

        $output_css .= ".widget_search .search-submit, .page .navigation .nav-links a, .page #submit, .page .reply .comment-reply-link, .single .navigation .nav-links a, .single #submit, .single .reply .comment-reply-link, .archive .navigation .nav-links a, .archive #submit, .archive .reply .comment-reply-link, .search-submit, .search .navigation .nav-links a,.site-header.header-sticky, #colophon, div.wpforms-container-full .wpforms-form button#wpforms-submit-235{ background-color:".esc_attr( $fullscreen_agency_primary_color ).";}";

       

       $refine_output_css = fullscreen_agency_css_strip_whitespace( $output_css );
        wp_add_inline_style( 'fullscreen-agency-style', $refine_output_css );
    }
endif;