<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       valso.nl
 * @since      1.0.0
 *
 * @package    Ff_Square
 * @subpackage Ff_Square/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Ff_Square
 * @subpackage Ff_Square/public
 * @author     Valso <contact@valso.nl>
 */
class Ff_Square_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

    /**
	 * Place three boxes on top of home
	 *
	 * @since    1.0.0
	 */
    public function add_boxes($content)
    {
        if (strpos('[ff]', $content) == -1) {
            return $content;
        }

        $html = '<div class="row">
        <div class="col-md-4">
            <div class="ff-square-box">
                <div class="ff-square-box-header">
                    <span><i class="fas fa-comments"></i></span>
                    <h5>Laatste Reacties</h5>
                </div>
                <div class="ff-square-box-items">
                    <div class="sk-chase" style="width: 22px; margin-top:2px; height: 22px; margin-right:1em; display:block;">
                              <div class="sk-chase-dot"></div>
                              <div class="sk-chase-dot"></div>
                              <div class="sk-chase-dot"></div>
                              <div class="sk-chase-dot"></div>
                              <div class="sk-chase-dot"></div>
                              <div class="sk-chase-dot"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="ff-square-box">
                <div class="ff-square-box-header">
                    <span><i class="fas fa-plus-square"></i></span>
                    <h5>Meeste + Stemmen</h5>
                    <select class="select-date">
                    <option value="0">24 uur</option>
                    <option value="1">1 week</option>
                    <option value="2">1 maand</option>
                    </select>
                </div>
                <div class="ff-square-box-items">

                    <div class="sk-chase" style="width: 22px; margin-top:2px; height: 22px; margin-right:1em; display:block;">
                              <div class="sk-chase-dot"></div>
                              <div class="sk-chase-dot"></div>
                              <div class="sk-chase-dot"></div>
                              <div class="sk-chase-dot"></div>
                              <div class="sk-chase-dot"></div>
                              <div class="sk-chase-dot"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="ff-square-box">
                <div class="ff-square-box-header">
                    <span><i class="fas fa-minus-square"></i></span>
                    <h5>Meeste - Stemmen</h5>
                    <select class="select-date">
                    <option value="0">24 uur</option>
                    <option value="1">1 week</option>
                    <option value="2">1 maand</option>
                    </select>
                </div>
                <div class="ff-square-box-items">
                    <div class="sk-chase" style="width: 22px; margin-top:2px; height: 22px; margin-right:1em;">
                              <div class="sk-chase-dot"></div>
                              <div class="sk-chase-dot"></div>
                              <div class="sk-chase-dot"></div>
                              <div class="sk-chase-dot"></div>
                              <div class="sk-chase-dot"></div>
                              <div class="sk-chase-dot"></div>
                    </div>
                </div>
            </div>
        </div>
        </div>';

        return $html . $content;
    }

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/ff-square-public.css', array(), $this->version, 'all' );

        wp_register_style( 'ffs-fontawesome', 'https://use.fontawesome.com/releases/v5.15.1/css/all.css' );
        wp_enqueue_style( 'ffs-fontawesome' );
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

        wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/ff-square-initializer.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/ff-square-public.js', array( 'jquery' ), $this->version, false );

        wp_register_script( 'ff_square', plugin_dir_url( __FILE__ ) . 'js/ff-square-ajax.js', array('jquery'), filemtime(plugin_dir_path( __FILE__ ) . 'js/ff-square-ajax.js'), false );
        wp_localize_script( 'ff_square', 'ff_square_ajax', [
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
            'comment_create_nonce' => wp_create_nonce("ffs_comment_create_nonce"),
            'block_get_nonce' => wp_create_nonce("ffs_block_get_nonce"),
            'comments_get_nonce' => wp_create_nonce("ffs_comments_get_nonce"),
            'vote_nonce' => wp_create_nonce("ffs_vote_nonce"),
            'loggedin' => is_user_logged_in(),
        ]);

        wp_enqueue_script( 'ff_square' );
	}

    function GetIP() {
        foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $key)
        {
            if (array_key_exists($key, $_SERVER) === true)
            {
                foreach (array_map('trim', explode(',', $_SERVER[$key])) as $ip)
                {
                    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false)
                    {
                        return $ip;
                    }
                }
            }
        }
    }

    function ffs_block_get()
    {
        global $wpdb;

        if ( !wp_verify_nonce( $_REQUEST['nonce'], "ffs_block_get_nonce")) {
            exit("Fout");
        }

        if ($_REQUEST['block'] == 1) {
            $sql = "SELECT A.*,B.post_header FROM {$wpdb->prefix}ff_square_comments A LEFT JOIN (SELECT post_header,post_id FROM {$wpdb->prefix}ff_posts)B ON A.post_id=B.post_id ORDER BY A.created_at LIMIT 6";
            echo json_encode($wpdb->get_results($sql, OBJECT));
        }

        if ($_REQUEST['block'] == 2 || $_REQUEST['block'] == 3) {

            switch ($_REQUEST['after']) {
                case 0 : $date = (new \DateTime())->modify('-1 day'); break;
                case 1 : $date = (new \DateTime())->modify('-1 week'); break;
                case 2 : $date = (new \DateTime())->modify('-4 weeks'); break;
            }
            $since = "WHERE post_timestamp>" . $date->getTimestamp() . " AND";
        }

        if ($_REQUEST['block'] == 2) {
            $sql = "SELECT item_id, SUM(vote) as vote FROM {$wpdb->prefix}ff_square_votes WHERE type='item' GROUP BY item_id having vote > 0 ORDER BY vote DESC LIMIT 7 ";
        }
        if ($_REQUEST['block'] == 3) {
            $sql = "SELECT item_id, SUM(vote) as vote FROM {$wpdb->prefix}ff_square_votes WHERE type='item' GROUP BY item_id having vote < 0 ORDER BY vote ASC LIMIT 7 ";
        }

        if ($_REQUEST['block'] == 2 || $_REQUEST['block'] == 3) {

            $resultd = $wpdb->get_results($sql, OBJECT);
            $sql = "SELECT post_id, post_header FROM {$wpdb->prefix}ff_posts " . $since . " ";

            foreach ($resultd as $key=>$post) {
                if ($key == (count($resultd)-1)) {
                    $sql.= "post_id='" . $post->item_id . "'";
                } else {
                    $sql.= "post_id='" . $post->item_id . "' OR ";
                }
            }

            $result = $wpdb->get_results($sql, OBJECT);

            echo json_encode([
                'votes' => json_encode($resultd),
                'posts' => json_encode($result)
            ]);
        }

        exit();
    }

    function ffs_comments_get() {

        global $wpdb;

        if ( !wp_verify_nonce( $_REQUEST['nonce'], "ffs_comments_get_nonce")) {
            exit("Fout");
        }

        //Get comments for post
        $post_id = $_REQUEST['post_id'];
        // WHERE post_id = " . $post_id
        $results['comments'] = $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}ff_square_comments", OBJECT );
        $results['votes'] = $wpdb->get_results( "SELECT item_id, SUM(vote) as vote FROM {$wpdb->prefix}ff_square_votes GROUP BY item_id", OBJECT );

        echo json_encode($results);

        exit();
    }

    function ffs_vote() {

        global $wpdb;

        if ( !wp_verify_nonce( $_REQUEST['nonce'], "ffs_vote_nonce")) {
            exit("Fout");
        }

        $item_id = $_REQUEST['item_id'];
        $type = $_REQUEST['type'];
        $vote = $_REQUEST['vote'];

        //Check if this ip address already voted on this item

        //Else
        $wpdb->insert($wpdb->prefix . 'ff_square_votes', [
           'ip_address' => $this->GetIP(),
           'vote' => $vote,
           'item_id' => $item_id,
           'type' => $type
        ]);

        echo '1';

        exit();
    }

    function ffs_comment_create() {

        global $wpdb;

        if (!wp_verify_nonce($_REQUEST['nonce'], "ffs_comment_create_nonce")) {
            exit("Fout");
        }

        // If logged in get user-id
        if (is_user_logged_in()) {

            $id = get_current_user_id();
        } else {

            //Create new user with email etc.
            $id = wp_insert_user([
                'user_login' => $_REQUEST['name'],
                'display_name' => $_REQUEST['name'],
                'user_email' => $_REQUEST['email'],
                'user_url' => $_REQUEST['website'],
                'user_pass' => wp_generate_password(12)
            ]);

            if (count($id->errors) > 0) {
                echo -1;
                exit();
            }
        }

        //Create comment function
        $post_id = $_REQUEST['post_id'];
        $comment = $_REQUEST['comment'];

        $wpdb->insert($wpdb->prefix . 'ff_square_comments', [
           'post_id' => $post_id,
           'comment' => $comment,
           'ip_address' => $this->GetIP(),
           'post_owner' => $id
        ]);

        if (is_user_logged_in()) {
            echo json_encode([
                'comment' => $comment,
                'name' => $_REQUEST['name']
            ]);
        } else {
            echo 0;
        }

        exit();
    }
}
