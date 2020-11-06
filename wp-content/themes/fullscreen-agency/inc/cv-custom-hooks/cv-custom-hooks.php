<?php
/**
 * Managed the custom functions and hooks for entire theme.
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

if( ! function_exists( 'fullscreen_agency_frontpage_manage_sections' ) ) :

	/**
	 * function to manage the sections display at frontpage
	 */

	function fullscreen_agency_frontpage_manage_sections() {

		get_template_part( 'template-parts/hero/content', 'hero' );
		get_template_part( 'template-parts/about/content', 'about' );
		get_template_part( 'template-parts/service/content', 'service' );
		get_template_part( 'template-parts/portfolio/content', 'portfolio' );
		get_template_part( 'template-parts/testimonial/content', 'testimonial' );
		get_template_part( 'template-parts/blog/content', 'blog' );
		get_template_part( 'template-parts/contact/content', 'contact' );

	}

endif;

add_action( 'fullscreen_agency_frontpage_sections', 'fullscreen_agency_frontpage_manage_sections', 10 );


/*----------------------------------------------------------------------------------------------------------------------------------*/

if( ! function_exists( 'fullscreen_agency_innerpage_header_start' ) ) :

	/**
	 * function to manage starting div of section
	 */

	function fullscreen_agency_innerpage_header_start() {
		$inner_header_attribute = '';
        if( is_single() ){
			$inner_header_attribute = 'background:url('.get_the_post_thumbnail_url().') center center / cover no-repeat fixed';
		}else{
	       	$inner_header_attribute = apply_filters( 'fullscreen_agency_inner_header_style_attribute', $inner_header_attribute );
		}
        if( !empty( $inner_header_attribute ) ) {
			$header_class = 'has-bg-img';
		} else {
			$header_class = 'no-bg-img';
		}
?>
		<div class="custom-header <?php echo esc_attr( $header_class ); ?>" <?php echo ( ! empty( $inner_header_attribute ) ) ? ' style="' . esc_attr( $inner_header_attribute ) . '" ' : ''; ?>>
            <div class="cv-container">
            	<div class="title-breadcumb-wrap">
<?php
	}
endif;

if( ! function_exists( 'fullscreen_agency_innerpage_header_title' ) ) :

	/**
	 * function to display the page title
	 */

	function fullscreen_agency_innerpage_header_title() {
		if( is_single() || is_page() ) {
			the_title( '<h1 class="page-title">', '</h1>' );
		} elseif( is_archive() ) {
			the_archive_title( '<h1 class="page-title">', '</h1>' );
			the_archive_description( '<div class="taxonomy-description">', '</div>' );
		} elseif( is_search() ) {
	?>
			<h1 class="page-title"><?php printf( esc_html__( 'Search Results for: %s', 'fullscreen-agency' ), '<span>' . esc_html( get_search_query() ) . '</span>' ); ?></h1>
	<?php
		} elseif( is_404() ) {
			echo '<h1 class="page-title">'. esc_html( '404 Error', 'fullscreen-agency' ) .'</h1>';
		}
	}

endif;

if( !function_exists( 'fullscreen_agency_breadcrumb_content' ) ) :

	/**
	 * function to manage the breadcrumbs content
	 */

	function fullscreen_agency_breadcrumb_content() {

		$fullscreen_agency_breadcrumb_option = get_theme_mod( 'fullscreen_agency_enable_breadcrumb_option', true );

		if ( false === $fullscreen_agency_breadcrumb_option ) {
			return;
		}
?>
		<div id="breadcrumb" class="cv-breadcrumb">
			<?php
			breadcrumb_trail( array(
				'container'   => 'div',
				'before'      => '<div class="cv-container">',
				'after'       => '</div>',
				'show_browse' => false,
			) );
			?>
		</div><!-- #breadcrumb -->
<?php
	}

endif;

if( ! function_exists( 'fullscreen_agency_innerpage_header_end' ) ) :

	/**
	 * function to manage ending div of section
	 */

	function fullscreen_agency_innerpage_header_end() {
?>
				</div><!-- .title-breadcumb-wrap -->
			</div><!-- .cv-container -->
	</div><!-- .custom-header -->
<?php
	}
	
endif;

add_action( 'fullscreen_agency_innerpage_header', 'fullscreen_agency_innerpage_header_start', 5 );
add_action( 'fullscreen_agency_innerpage_header', 'fullscreen_agency_innerpage_header_title', 10 );
add_action( 'fullscreen_agency_innerpage_header', 'fullscreen_agency_breadcrumb_content', 15 );
add_action( 'fullscreen_agency_innerpage_header', 'fullscreen_agency_innerpage_header_end', 20 );