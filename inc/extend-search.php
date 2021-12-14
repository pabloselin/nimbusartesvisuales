<?php

/**
 * Reference: https://websmartdesign.nz/searching-structured-post-data-with-wordpress/
 * Make meta data searchable
 */

// Join wp_postmeta
add_filter('posts_join', function($join) {
    global $wpdb;
    $join .= "LEFT JOIN {$wpdb->postmeta} ON ({$wpdb->posts}.ID = {$wpdb->postmeta}.post_id) ";
    return $join;
});

// Group by post ID
add_filter('posts_groupby', function($groupby) {
    global $wpdb;
    $groupby = "{$wpdb->posts}.ID";
    return $groupby;
});

// Filter filter filter
add_filter('posts_search', function (string $search, \WP_Query $wp_query) {
    global $wpdb;

    if ($wp_query->query_vars['search_terms_count']) {
        // Get meta key filters
        $meta_keys = apply_filters('ls_query_meta_keys', []);

        // Valid operators
        $ops = ['=','!=','LIKE','NOT LIKE','IN','NOT IN'];

        // Initialize search/replace array
        $replace = [
            0 => [],
            1 => [],
        ];

        // Query variables
        $exclusion_prefix = apply_filters('wp_query_search_exclusion_prefix', '-');
        $n = ! empty($wp_query->query_vars['exact']) ? '' : '%';

        // Loop through meta keys
        foreach($meta_keys as $meta_key) {
            // Check required keys
            if (!is_array($meta_key) || !isset($meta_key['key'])) continue;

            // Build replace array
            foreach ($wp_query->query_vars['search_terms'] as $term) {
                // If there is an $exclusion_prefix, terms prefixed with it should be excluded.
                $exclude = $exclusion_prefix && ($exclusion_prefix === substr($term, 0, 1));

                // Build Operators
                if ($exclude) {
                    $like_op  = 'NOT LIKE';
                    $andor_op = 'AND';
                    $term     = substr($term, 1);
                } else {
                    $like_op  = 'LIKE';
                    $andor_op = 'OR';
                }

                // Like Terms
                if ($n && ! $exclude) {
                    $like = '%' . $wpdb->esc_like($term) . '%';
                }
                $like = $n . $wpdb->esc_like($term) . $n;

                // Meta key
                if (is_array($meta_key['key'])) {
                    $meta_key['key'] = '(' . implode(',', $meta_key['key']) . ')';
                }

                // Meta key operators
                $key_op = isset($meta_key['key_op']) ? $meta_key['key_op'] : '';
                if (!in_array($key_op, $ops)) {
                    $key_op = 'LIKE';
                }

                // Meta key
                if (!isset($meta_key['value'])) {
                    $meta_key['value'] = $like;
                }

                // Meta value operators
                $value_op = $like_op;
                if (isset($meta_key['value_op']) && in_array($key_op, $ops)) {
                    $value_op = $meta_key['value_op'];
                }

                // Add patterns
                $pattern = "({$wpdb->posts}.post_title $like_op %s) $andor_op";
                $replace[0][] = $wpdb->prepare($pattern, $like);
                $replace[1][] = $wpdb->prepare(
                    "({$wpdb->postmeta}.meta_key $key_op %s AND {$wpdb->postmeta}.meta_value $value_op %s) $andor_op $pattern",
                    $meta_key['key'],
                    $meta_key['value'],
                    $like
                );
            }
        }

        $search = str_ireplace($replace[0], $replace[1], $search);
    }

    return $search;
}, 10, 2);

// Add meta filters
add_filter('ls_query_meta_keys', function(array $keys) {
    $keys[] = [
        'key' => '%content',
        'key_op' => 'LIKE',
    ];

    return $keys;
}, 10, 1);



/**
 * Append ACF image object
 */
add_action('rest_api_init', function() {
    register_rest_field('post', 'featured_image', [
        'get_callback' => function($data) {
            if (isset($data['featured_media'])) {
                return acf_get_attachment($data['featured_media']);
            }
            return [];
        }
    ]);
});