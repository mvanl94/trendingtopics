<?php
/**
 * Template part for displaying section of hero content
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

$fullscreen_agency_enable_hero_section = get_theme_mod( 'fullscreen_agency_enable_hero_section', true );
$fullscreen_agency_hero_image = get_theme_mod( 'fullscreen_agency_hero_image', esc_url(  get_template_directory_uri() . '/assets/images/hero.jpg' ) );

if( false === $fullscreen_agency_enable_hero_section ) {
	return;
}
$fullscreen_agency_hero_title = get_theme_mod( 'fullscreen_agency_hero_title', 'Get Your Dream Work' );
$fullscreen_agency_hero_content = get_theme_mod( 'fullscreen_agency_hero_content', esc_html( 'The driving force of a career must come from the individual. Remember: Jobs are owned by the company, you own your career!', 'fullscreen-agency' ) );
$fullscreen_agency_hero_button_label = get_theme_mod( 'fullscreen_agency_hero_button_label', 'Work Now' );
$fullscreen_agency_hero_button_link = get_theme_mod( 'fullscreen_agency_hero_button_link', '#' );

?>
<div id="cv-hero-section" class="cv-fullpage-section cv-pink-gradient-opacity-bg" style="background-image: url( <?php echo esc_url( $fullscreen_agency_hero_image ); 	?> )">
	<div class="cv-container">
		<div class="hero-content-wrapper">
			<?php
				if( !empty( $fullscreen_agency_hero_title ) ){
			?>
					<div class="hero-title wow fadeInUp" data-wow-delay = 0.3s><?php echo esc_html( $fullscreen_agency_hero_title ); ?></div>
			<?php
				}
				if( !empty( $fullscreen_agency_hero_content ) ){
			?>
					<div class="hero-content wow fadeInUp" data-wow-delay = 0.6s><?php echo esc_html( $fullscreen_agency_hero_content ); ?></div>
			<?php
				}

				if( !empty( $fullscreen_agency_hero_button_link ) ){
			?>
					<div class="hero-button wow fadeInUp" data-wow-delay = 0.8s><a href="<?php echo esc_url( $fullscreen_agency_hero_button_link ); ?>"><?php echo esc_html( $fullscreen_agency_hero_button_label ); ?></a>
					</div>
			<?php
				}
			?>
		</div><!-- .hero-content-wrapper -->
		<div class="icon-scroll">
		</div>
	</div><!--.cv-container-->
</div><!-- #cv-hero-section -->
