<?php
/**
 * Template part for displaying section of blog content
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

$fullscreen_agency_enable_blog_section = get_theme_mod( 'fullscreen_agency_enable_blog_section', true );
$fullscreen_agency_blog_cat 		= get_theme_mod( 'fullscreen_agency_blog_cat', '' );
if( false === $fullscreen_agency_enable_blog_section || empty( $fullscreen_agency_blog_cat ) ) {
	return;
}

$fullscreen_agency_blog_title 		= get_theme_mod( 'fullscreen_agency_blog_title', __( 'Latest News', 'fullscreen-agency' ) );
$fullscreen_agency_blog_count 		= apply_filters( 'fullscreen_agency_blog_count', 3 );
$fullscreen_agency_blog_more_button = get_theme_mod( 'fullscreen_agency_blog_more_button', __( 'Read More', 'fullscreen-agency' ) );

?>
	<div id="cv-blogs-section" class="cv-fullpage-section cv-purple-gradient-bg cv-felt-bg-pattern" >
		<div class="cv-container">
			<div class="cv-column-wrapper">
				<?php
					if( !empty( $fullscreen_agency_blog_title ) ) {
				?>
					<h2 class="section-title wow fadeInUp"><span><?php echo esc_html( $fullscreen_agency_blog_title ); ?></span></h2>
					<div class="cv-blogs-wrapper">
					<?php
						}
						if( !empty( $fullscreen_agency_blog_cat ) ) {
							$blog_args = array(
									'post_type' 	 => 'post',
									'category_name'	 => esc_attr( $fullscreen_agency_blog_cat ),
									'posts_per_page' => absint( $fullscreen_agency_blog_count ),
								);
							$wow_delay = 0;

								$blog_query = new WP_Query( $blog_args );
								if( $blog_query->have_posts() ) {
									while( $blog_query->have_posts() ) {
										$blog_query->the_post();
										$wow_delay = $wow_delay + 0.3;	?>
										<div class="single-blog-wrap cv-column-<?php echo absint( $fullscreen_agency_blog_count ); ?> wow fadeInUp" data-wow-delay = <?php echo esc_attr( $wow_delay ).'s'; ?>>
											<?php if( has_post_thumbnail() ) { the_post_thumbnail( 'medium_large' ); } ?>
											<div class="single-blog-content">
												<h3 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
												<div class="post-excerpt"><?php the_excerpt(); ?></div>
												<a href="<?php the_permalink(); ?>" class="btn-blog btn-read-more"><?php echo esc_html( $fullscreen_agency_blog_more_button ); ?></a>
											</div>
										</div><!-- .single-blog-wrap -->
						<?php
								}
							}
							wp_reset_postdata();
						}
					?>
					</div><!-- .cv-blogs-wrapper -->
			</div><!--cv-column-wrapper-->
		</div><!--.cv-container-->
	</div><!-- #cv-blogs-section -->