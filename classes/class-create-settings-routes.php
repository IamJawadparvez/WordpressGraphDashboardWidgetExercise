<?php
/**
 * This file will create Custom REST API End Points.
 */
class WP_React_Settings_Rest_Route {

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() {
        register_rest_route( 'wprk/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [ $this, 'get_settings' ],
            'permission_callback' => [ $this, 'get_settings_permission' ]
        ] );
        
    }

   
    public function get_settings() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'chartTable';
        $all_qu = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM {$table_name} "
            ),ARRAY_A
        );

        //$result = $wpdb->get_results("SELECT * FROM `wp_chartTable`");
        
        //return rest_ensure_response( 'success' );
        return $all_qu;
    }

    public function get_settings_permission() {
        return true;
    }

    
    public function save_settings_permission() {
        return current_user_can( 'publish_posts' );
    }
}
new WP_React_Settings_Rest_Route();