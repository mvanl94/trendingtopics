<?php namespace flow;
use flow\settings\FFSettingsUtils;
use flow\settings\FFStreamSettings;

if ( ! defined( 'WPINC' ) ) die;
/**
 * Flow-Flow
 *
 * Plugin class. This class should ideally be used to work with the
 * public-facing side of the WordPress site.
 *
 * If you're interested in introducing administrative or dashboard
 * functionality, then refer to `FlowFlowAdmin.php`
 *
 * @package   FlowFlow
 * @author    Looks Awesome <email@looks-awesome.com>

 * @link      http://looks-awesome.com
 * @copyright Looks Awesome
 */
class FlowFlow extends LABase{
	/**
	 * Initialize the plugin by setting localization and loading public scripts
	 * and styles.
	 *
	 * @since     1.0.0
	 *
	 * @param array $context
	 * @param $slug
	 * @param $slug_down
	 */
	protected function __construct($context, $slug, $slug_down) {
		parent::__construct($context, $slug, $slug_down);
	}
	
	protected function getShortcodePrefix(){
		return 'ff';
	}

	protected function getPublicContext($stream, $context){
		$context['boosted'] = FFSettingsUtils::YepNope2ClassicStyleSafe($stream, 'cloud', false);

		$context['moderation'] = false;
		if (isset($stream->feeds) && !empty($stream->feeds)){
			foreach ( $stream->feeds as $source ) {
				if (FFSettingsUtils::YepNope2ClassicStyleSafe($source, 'mod', false)){
					$context['moderation'] = true;
				}
			}
		}

		$settings = new FFStreamSettings($stream);
		$this->cache->setStream($settings, $context['moderation']);
		$context['stream'] = $stream;
		$context['hashOfStream'] = $this->cache->transientHash($stream->id);
		$context['seo'] = false;////$this->generalSettings->isSEOMode();
		$context['can_moderate'] = FF_USE_WP ? $this->generalSettings->canModerate() : ff_user_can_moderate();
		$context['token'] = $context['can_moderate'] ? $this->db->getToken(true) : '';
		return $context;
	}

	protected function enqueueStyles(){
	}

	protected function enqueueScripts(){
	}

	protected function getNameJSOptions(){
		return 'FlowFlowOpts';
	}
}
