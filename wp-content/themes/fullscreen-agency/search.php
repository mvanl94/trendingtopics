<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

get_header();
?>

	<section id="primary" class="content-area">
		
		<?php if ( have_posts() ) : 
        echo '<main id="main" class="site-main">';
			/* Start the Loop */
			while ( have_posts() ) :
				the_post();

				/**
				 * Run the loop for the search to output the results.
				 * If you want to overload this in a child theme then include a file
				 * called content-search.php and that will be used instead.
				 */
				get_template_part( 'template-parts/content', 'search' );

			endwhile;
            echo '</main><!-- #main -->';

		else :

			get_template_part( 'template-parts/content', 'none' );

		endif;
		?>

        <div class="page-nav">
            <?php the_posts_navigation(); ?>
        </div>
	</section><!-- #primary -->

<?php
get_sidebar();
get_footer();
