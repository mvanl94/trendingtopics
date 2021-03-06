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
				if (is_single()) {
					return false;
				}
        if (strpos('[ff]', $content) == -1) {
            return $content;
        }

        $html = '<div class="ff-square-box-wrapper">
            <div class="ff-square-box latest-comments">
                <div class="ff-square-box-header">
                    <h5><i class="fas fa-comments" style="color:#2c6ff6; margin-right:0.5em;"></i>Laatste Reacties</h5>
                    <a class="btn collapse-block" aria-controls="block1">
                    Bekijken
                    </a>
                </div>
                <div class="collapse block1">

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
            <div id="votes" class="ff-square-box">
                <div class="ff-square-box-header">
                    <h5><i class="fas fa-chart-line" style="color:#24ca24; margin-right:0.5em;"></i>Meeste stemmen</h5>
                    <select class="select-type desktop">
                    <option value="0">Upvotes</option>
                    <option value="2">Downvotes</option>
                    </select>
                    <select class="select-date desktop">
                    <option value="2" selected="selected">1 maand</option>
                    <option value="1">1 week</option>
                    <option value="0">24 uur</option>

                    </select>
                    <a class="btn collapse-block" aria-controls="block2">
                    Bekijken
                    </a>


                </div>

                <div class="collapse block2">
                    <div class="ff-square-box-header-mobile">
                        <select class="select-type mobile">
                        <option value="0">Upvotes</option>
                        <option value="2">Downvotes</option>
                        </select>
                        <select class="select-date mobile">
                        <option value="2" selected="selected">1 maand</option>
                        <option value="1">1 week</option>
                        <option value="0">24 uur</option>
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
            <div id="hottopics" class="ff-square-box">
                <div class="ff-square-box-header">

                    <h5><i class="fas fa-fire" style="color:orange; margin-right:0.5em;"></i>Hot Topics</h5>
                    <select class="select-date desktop">
                    <option value="2" selected="selected">1 maand</option>
                    <option value="1">1 week</option>
                    <option value="0">24 uur</option>
                    </select>
                    <a class="btn collapse-block" aria-controls="block3">
                    Bekijken
                    </a>
                </div>

                <div class="collapse block3">
                    <div class="ff-square-box-header-mobile">
                        <select class="select-date mobile">
                        <option value="2" selected="selected">1 maand</option>
                        <option value="1">1 week</option>
                        <option value="0">24 uur</option>
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

        </div>';

        return $html . $content;
    }

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

			if (is_single()) {
				return false;
			}
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

				if (is_single()) {
						return false;
				}
        wp_register_script( 'ffs-jquery', 'https://code.jquery.com/jquery-3.2.1.slim.min.js' );
        wp_enqueue_script( 'ffs-jquery' );

        wp_register_script( 'ffs-bootstrap', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js' );
        wp_enqueue_script( 'ffs-bootstrap' );

        wp_register_script( 'ffs-popper', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js' );
        wp_enqueue_script( 'ffs-popper' );

        wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/ff-square-initializer.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/ff-square-public.js', array( 'jquery' ), $this->version, false );

        wp_register_script( 'ff_square', plugin_dir_url( __FILE__ ) . 'js/ff-square-ajax.js', array('jquery'), filemtime(plugin_dir_path( __FILE__ ) . 'js/ff-square-ajax.js'), false );
        wp_localize_script( 'ff_square', 'ff_square_ajax', [
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
            'comment_create_nonce' => wp_create_nonce("ffs_comment_create_nonce"),
            'block_get_nonce' => wp_create_nonce("ffs_block_get_nonce"),
            'comments_get_nonce' => wp_create_nonce("ffs_comments_get_nonce"),
            'fetch_post_nonce' => wp_create_nonce("ffs_fetch_post_nonce"),
			'respect_nonce' => wp_create_nonce("ffs_respect_nonce"),
            'vote_nonce' => wp_create_nonce("ffs_vote_nonce"),
            'loggedin' => is_user_logged_in(),
			'user' => wp_get_current_user()
        ]);

        wp_enqueue_script( 'ff_square' );
	}

    function GetIP() {
        // foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $key)
        // {
        //     if (array_key_exists($key, $_SERVER) === true)
        //     {
        //         foreach (array_map('trim', explode(',', $_SERVER[$key])) as $ip)
        //         {
        //             if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false)
        //             {
        //                 return $ip;
        //             }
        //         }
        //     }
        // }
        return $_SERVER['REMOTE_ADDR'];
    }

    function ffs_block_get()
    {
        global $wpdb;

        if ( !wp_verify_nonce( $_REQUEST['nonce'], "ffs_block_get_nonce")) {
            exit("Fout");
        }

        if ($_REQUEST['block'] == 1) {

            $sql = "SELECT *
            FROM {$wpdb->prefix}ff_square_comments
            WHERE created_at>0
            ORDER BY created_at DESC
            LIMIT 9";

            $comments = $wpdb->get_results($sql, OBJECT);

            if (count($comments) == 0) {
                echo json_encode(0);
                exit();
            }

            $sql = "SELECT * FROM {$wpdb->prefix}ff_posts WHERE ";

            foreach ($comments as $key=>$comment) {
                if ($key == (count($comments) - 1)) {
                    $sql.= "post_id='" . $comment->post_id . "'";
                } else {

                    $sql.= "post_id='" . $comment->post_id . "' OR ";
                }
            }

            // $sql.= "GROUP BY post_id";

            $posts = $wpdb->get_results($sql, OBJECT);

            foreach ($comments as $comment) {
                $comment->created_at = date('Y-m-d H:m:s', $comment->created_at);
            }
            echo json_encode([
                'comments' => json_encode($comments),
                'posts' => json_encode($posts)
            ]);
        }

        if ($_REQUEST['block'] == 2) {

            switch ($_REQUEST['after']) {
                case 0 : $date = (new \DateTime())->modify('-1 day'); break;
                case 1 : $date = (new \DateTime())->modify('-1 week'); break;
                case 2 : $date = (new \DateTime())->modify('-4 weeks'); break;
            }

            $sql = "SELECT item_id, SUM(vote) AS vote
            FROM {$wpdb->prefix}ff_square_votes
            WHERE type='item' AND created_at>" . $date->getTimestamp() . "
            GROUP BY item_id
            HAVING vote " . ($_REQUEST['type'] == 0 ? '>' : '<' ) . " 0
            ORDER BY vote " . ($_REQUEST['type'] == 0 ? 'DESC' : 'ASC' );

            $votes = $wpdb->get_results($sql, OBJECT);

            if (count($votes) == 0) {
                echo json_encode(0);
                exit();
            }

            $sql = "SELECT post_id, post_header FROM {$wpdb->prefix}ff_posts WHERE ";

            foreach ($votes as $key=>$post) {
                if ($key == (count($votes)-1)) {
                    $sql.= "post_id='" . $post->item_id . "'";
                } else {

                    $sql.= "post_id='" . $post->item_id . "' OR ";
                }
            }

            $sql.= "GROUP BY post_id";

            $result = $wpdb->get_results($sql, OBJECT);

            echo json_encode([
                'votes' => json_encode($votes),
                'posts' => json_encode($result)
            ]);
        }

        if ($_REQUEST['block'] == 3) {

            switch ($_REQUEST['after']) {
                case 0 : $date = (new \DateTime())->modify('-1 day'); break;
                case 1 : $date = (new \DateTime())->modify('-1 week'); break;
                case 2 : $date = (new \DateTime())->modify('-4 weeks'); break;
            }

            $sql = "SELECT *, COUNT(*) AS comments
            FROM {$wpdb->prefix}ff_square_comments
            WHERE created_at>" . $date->getTimestamp() . "
            GROUP BY post_id
            HAVING comments > 0
            ORDER BY comments DESC
            LIMIT 7";

            $comments = $wpdb->get_results($sql, OBJECT);

            if (count($comments) == 0) {
                echo json_encode(0);
                exit();
            }

            $sql = "SELECT post_id, post_header FROM {$wpdb->prefix}ff_posts WHERE ";

            foreach ($comments as $key=>$comment) {
                if ($key == (count($comments)-1)) {
                    $sql.= "post_id='" . $comment->post_id . "'";
                } else {
                    $sql.= "post_id='" . $comment->post_id . "' OR ";
                }
            }

            $sql.= "GROUP BY post_id";

            $posts = $wpdb->get_results($sql, OBJECT);

            echo json_encode([
                'comments' => json_encode($comments),
                'posts' => json_encode($posts),
                'timestamp' => $date->getTimestamp()
            ]);


        }

        exit();
    }

    function ffs_fetch_post() {

        global $wpdb;

        if ( !wp_verify_nonce( $_REQUEST['nonce'], "ffs_fetch_post_nonce")) {
            exit("Fout");
        }

        $post_id = $_REQUEST['post_id'];

        $result = $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}ff_posts WHERE post_id='" . $post_id . "'", OBJECT );

        echo json_encode($result);

        exit();
    }

    function ffs_comments_get() {

        global $wpdb;

        if ( !wp_verify_nonce( $_REQUEST['nonce'], "ffs_comments_get_nonce")) {
            exit("Fout");
        }

        $post_id = $_REQUEST['post_id'];

        $comments = $wpdb->get_results(
            "SELECT ID, user_nicename, comment, comment_id, post_id, created_at
            FROM {$wpdb->prefix}ff_square_comments
            LEFT JOIN (SELECT ID, user_nicename FROM {$wpdb->prefix}users) {$wpdb->prefix}users
            ON {$wpdb->prefix}ff_square_comments.post_owner = {$wpdb->prefix}users.ID
                    WHERE post_id='" . $post_id . "'"
        , OBJECT );

        foreach ($comments as $comment) {
            $comment->created_at = date('Y-m-d H:i:s', $comment->created_at);
        }

        $results['comments'] = $comments;
        $results['votes'] = $wpdb->get_results( "SELECT item_id, SUM(vote) as vote FROM {$wpdb->prefix}ff_square_votes WHERE item_id='" . $post_id . "' GROUP BY item_id", OBJECT );

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
        $ip_address = $this->GetIP();
        $sql = $wpdb->get_results("SELECT * FROM " . $wpdb->prefix . "ff_square_votes WHERE item_id='". $item_id. "' AND ip_address='" . $ip_address . "'");

        if (count($sql) == 0) {
            $wpdb->insert($wpdb->prefix . 'ff_square_votes', [
               'ip_address' => $this->GetIP(),
               'vote' => $vote,
               'item_id' => $item_id,
               'type' => $type,
               'created_at' => time()
            ]);

            echo '1';
        } else {
            echo '0';
        }

        exit();
    }

	//
	function ffs_respect()
	{
		global $wpdb;

		if ( !wp_verify_nonce( $_REQUEST['nonce'], "ffs_respect_nonce")) {
            exit("Fout");
        }

		if (is_user_logged_in()) {

			//Check if respect is already given
			$wpdb->get_results(
				'SELECT * FROM ' . $wpdb->prefix . 'ff_square_respect WHERE
				sender_id=' . get_current_user_id() . ' AND
				receiver_id=' . $_REQUEST['receiver']);

			if ($wpdb->num_rows) {
				echo 0;
			} else {

				$wpdb->get_results(
					'INSERT INTO ' . $wpdb->prefix . 'ff_square_respect SET
					sender_id="' . get_current_user_id() . '",
					receiver_id="' . $_REQUEST['receiver'] . '",
					created_at=' . time());

				echo 1;
			}
		} else {
			echo -1;
		}

		exit();
	}

	//Als comment geplaatst wordt dan moeten alle mensen die op dit item gereageerd
	//hebben een notificatie ontvangen per mail
	function sendNotifcation($post_id, $comment, $name)
	{
		global $wpdb;

		$headers[] = 'Content-type: text/html';

		//Get post
		$post = $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'ff_posts WHERE post_id="' . $post_id . '"');
		//Get all users by post_id
		$users = $wpdb->get_results('SELECT post_owner FROM ' . $wpdb->prefix . 'ff_square_comments WHERE post_id="' . $post_id . '"');

		foreach ($users as $user) {
			//Send notification to all but logged in user
			if (get_current_user_id() != $user->post_owner) {

				$us = $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'users WHERE ID=' . $user->post_owner);

				$message = 'Dag ' . $us[0]->user_nicename . '<br><br>';
				$message.= $name . ' heeft gereageerd met ' . $comment . ' op ' . $post[0]->post_header . '<br><br>';

				wp_mail($us[0]->user_email, 'Iemand heeft ook gereageerd op dit bericht', $message, $headers);
			}
		}
	}

    function ffs_comment_create() {

        global $wpdb;
				date_default_timezone_set('Europe/London');

        if (!wp_verify_nonce($_REQUEST['nonce'], "ffs_comment_create_nonce")) {
            exit("Fout");
        }

        // If logged in get user-id
        if (is_user_logged_in()) {

            $id = get_current_user_id();
            $name = wp_get_current_user()->user_nicename;

        } else {

            $name = $_REQUEST['name'];

            //Create new user with email etc.
            $id = register_new_user($_REQUEST['email'], $_REQUEST['email']);

            wp_update_user([
                'ID' => $id,
                'user_nicename' => $name,
                'display_name' => $name
            ]);

            if (count($id->errors) > 0) {
                echo -1;
                exit();
            }
        }

        //Create comment function
        $post_id = $_REQUEST['post_id'];
        $comment = strip_tags($_REQUEST['comment']);
        $ip_address = $this->GetIP();

		//Send Notification
		$this->sendNotifcation($post_id, $comment, $name);

        $wpdb->get_results(
            'INSERT INTO ' . $wpdb->prefix . 'ff_square_comments SET
            post_id="' . $post_id . '",
            comment="' . $comment . '",
            ip_address="' . $ip_address . '",
            post_owner="' . $id . '",
            created_at=' . time());

        if (is_user_logged_in()) {
            echo json_encode([
                'comment' => $comment,
                'post_id' => $post_id,
                'name' => $name,
				'created_at' => date('Y-m-d H:i:s', time())
            ]);
        } else {
            echo 0;
        }

        exit();
    }
}
