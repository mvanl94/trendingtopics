<?php
/**
 * Template part for displaying frontpage posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */
?>

<div class="cv-overlay">
	<div class="cv-container">
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<div class="wow fadeInUp" data-wow-delay=0.6s">
				<div class="cv-post-content-wrapper">

					<header class="entry-header">
						<?php
						if ( is_singular() ) :
							the_title( '<h1 class="entry-title">', '</h1>' );
						else :
							the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
						endif;

						if ( 'post' === get_post_type() ) :
							?>
							<div class="entry-meta">
								<?php fullscreen_agency_posted_on(); ?>
							</div><!-- .entry-meta -->
						<?php endif; ?>
					</header><!-- .entry-header -->

				</div><!-- .cv-post-content-wrapper -->

				<div class="entry-content">
					<?php
					the_excerpt();

					wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'fullscreen-agency' ),
						'after'  => '</div>',
					) );
					?>
				</div><!-- .entry-content -->
				
			</div>
			
		</article><!-- #post-<?php the_ID(); ?> -->
	</div>
</div>
