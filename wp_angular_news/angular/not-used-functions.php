<?php



function wp_json_namespace_v2__init()
{

    // create json-api endpoint

    add_action('rest_api_init', function () {

        // http://example.com/wp-json/namespace/v2/posts?filter[meta_value][month]=12&filter[meta_value][year]=2015

        register_rest_route('namespace/v2', '/posts', array (
            'methods'             => 'GET',
            'callback'            => 'wp_json_namespace_v2__posts',
            'permission_callback' => function (WP_REST_Request $request) {
                return true;
            }
        ));
    });

    // handle the request

    function wp_json_namespace_v2__posts($request)
    {
        // json-api params

        $parameters = $request->get_query_params();

        // default search args

        $args = array(
            'post_type'      => 'post',
            'post_status'    => 'publish',
            'numberposts'    => -1,
            // limit to only ids
            // 'fields'      => 'ids', 
        );

        // check the query and add valid items

        if (isset($parameters['filter']['meta_value'])) {
            foreach ($parameters['filter']['meta_value'] as $key => $value) {
                switch ($key) {

                    case 'month':
                        if (is_numeric($value))
                            $args['monthnum'] = $value;
                        break;

                    case 'year':
                        if (is_numeric($value))
                            $args['year'] = $value;
                        break;
                }
            }
        }

        // run query

        $posts = get_posts($args);

        // return results

        $data = array(
            'success' => true,
            'request' => $parameters,
            'count' => count($posts),
            'posts' => $posts,
        );

        return new WP_REST_Response($data, 200);
    }

    flush_rewrite_rules(true); // FIXME: <------- DONT LEAVE ME HERE
}

add_action('init', 'wp_json_namespace_v2__init');
