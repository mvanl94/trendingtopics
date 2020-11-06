<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package CodeVibrant
 * @subpackage Fullscreen Agency
 * @since 1.0.0
 */

get_header();
?>

	<div id="primary" class="content-area">
		<main id="main" class="theme-main">

			<section class="error-404 not-found">
				<header class="page-header">
                    <div class="error-num">404<span class="error-content"><?php esc_html_e( 'Error', 'fullscreen-agency' ); ?></span></div>
					<h3 class="page-title">
                    <?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'fullscreen-agency' ); ?>
                    </h3>
				</header><!-- .page-header -->
			</section><!-- .error-404 -->
		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_sidebar();
get_footer();
