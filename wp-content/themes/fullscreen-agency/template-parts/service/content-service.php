<?php
/**
 * Template part for displaying section of services content
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

$fullscreen_agency_enable_services_section = get_theme_mod( 'fullscreen_agency_enable_services_section', true );
$fullscreen_agency_service_cat 			= get_theme_mod( 'fullscreen_agency_service_cat', '' );
if( false === $fullscreen_agency_enable_services_section || empty( $fullscreen_agency_service_cat ) ) {
	return;
}

$fullscreen_agency_service_title 		= get_theme_mod( 'fullscreen_agency_service_title', __( 'Services', 'fullscreen-agency' ) );
$fullscreen_agency_service_more_button 	= get_theme_mod( 'fullscreen_agency_service_more_button', __( 'Read More', 'fullscreen-agency' ) );
$fullscreen_agency_service_post_count 	= apply_filters( 'fullscreen_agency_service_post_count', 3 );
?>

	<div id="cv-services-section" class="cv-fullpage-section cv-green-gradient-bg cv-asfalt-light-bg-pattern" >
		<div class="cv-container">
			<?php
				if( !empty( $fullscreen_agency_service_title ) ) {
			?>
					<h2 class="section-title wow fadeInUp"><?php echo esc_html( $fullscreen_agency_service_title ); ?></h2>
			<?php
				}
			?>
				<div class="cv-services-wrapper cv-column-wrapper">
					<?php
						if( !empty( $fullscreen_agency_service_cat ) ){
							$service_args = array(
									'post_type' 	 => 'post',
									'category_name'	 => esc_attr( $fullscreen_agency_service_cat ),
									'posts_per_page' => absint( $fullscreen_agency_service_post_count ),
								);
							$service_query = new WP_Query( $service_args );
							if( $service_query->have_posts() ){
								while( $service_query->have_posts() ){
									$service_query->the_post();
					?>
								<div class="single-service-wrap cv-column-3 wow fadeInUp"  data-wow-delay = 0.3s>
									<div class="service-image">
										<?php if( has_post_thumbnail() ) { the_post_thumbnail( 'thumbnail' ); } ?>
									</div>
									<h3 class="service-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
									<div class="service-excerpt"><?php  the_excerpt(); ?></div>
									<a href="<?php the_permalink(); ?>" class="btn-service btn-read-more"><?php echo esc_html( $fullscreen_agency_service_more_button ); ?></a>
								</div><!-- .single-service-wrap -->
					<?php
								}
							}
							wp_reset_postdata();
						}
					?>
				</div><!-- .cv-services-wrapper -->
		</div><!-- .cv-container-->
	</div><!-- #cv-services-section -->
