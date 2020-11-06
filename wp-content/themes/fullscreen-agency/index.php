<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */
get_header();
?>
	<?php
		if ( is_front_page() ) {
			$fullscreen_agency_home_posts = get_theme_mod( 'fullscreen_agency_home_posts', false );
			if ( false === $fullscreen_agency_home_posts ) {
				if ( have_posts() ) {
					//echo '';
				    $i = 0;
					/* Start the Loop */
					while ( have_posts() ) {
						the_post();

                    	$thumbnail = get_the_post_thumbnail_url( get_the_ID(), 'fullscreen-agency-slider' );
                        $thumbnail_class = 'has-thumbnail';
                        if ( ( $i%2 ) == 0 ) {
                            $post_class = 'odd-post';
                        } else {
                            $post_class = 'even-post';
                        }
			?>
                        <div class="front-latest-post cv-fullpage-section <?php echo esc_attr( $thumbnail_class  ).' '. esc_attr( $post_class ); ?>" <?php if( !empty( $thumbnail ) ){ ?> style="background-image: url( <?php echo esc_url( $thumbnail ); ?> ); background-size: cover; background-repeat: no-repeat; background-position: top center; background-attachment: fixed;"<?php } ?>>
			<?php    
							/*
							 * Include the Post-Type-specific template for the content.
							 * If you want to override this in a child theme, then include a file
							 * called content-___.php (where ___ is the Post Type name) and that will be used instead.
							 */
							get_template_part( 'template-parts/content/content', 'home' );
	                        $i++;
			?>
                        </div><!-- .front-latest-post -->
			<?php
                    }
                    //echo '</div>';
				}
			}
		} else {
	?>
			<div id="primary" class="content-area">
				<main id="main" class="site-main">

				<?php
				if ( have_posts() ) :

					if ( is_home() && ! is_front_page() ) :
						?>
						<header>
							<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
						</header>
						<?php
					endif;

					/* Start the Loop */
					while ( have_posts() ) :
						the_post();

						/*
						 * Include the Post-Type-specific template for the content.
						 * If you want to override this in a child theme, then include a file
						 * called content-___.php (where ___ is the Post Type name) and that will be used instead.
						 */
						get_template_part( 'template-parts/content', get_post_type() );

					endwhile;

					the_posts_navigation();

				else :

					get_template_part( 'template-parts/content', 'none' );

				endif;
				?>

				</main><!-- #main -->
			</div><!-- #primary -->

<?php
		}
get_footer();
