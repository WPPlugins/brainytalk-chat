<?php
/**
 * @author Gabriel Stringari
 * @version 29/01/2016
 *
 * Fun��o que adiciona os arquivos de javascript no site
 */

function brainytalk_scripts_loader() {
    //Plugins
    wp_enqueue_script( 'jquery' );
}

/**
 * @author Gabriel Stringari
 * @version 01/11/2015
 *
 * Função que adiciona os arquivos de estilo no site
 */
function brainytalk_styles_loader() {
 }

// Registamos a função para correr na ativa��o do plugin
register_activation_hook( __FILE__, 'brainytalk_install_hook' );

function brainytalk_install_hook() {
    /* Vamos testar a versão do PHP e do WordPress
       caso as versões sejam antigas, desativamos
       o nosso plugin. */
    if ( version_compare( PHP_VERSION, '5.2.1', '<' )
        or version_compare( get_bloginfo( 'version' ), '3.3', '<' ) ) {
            deactivate_plugins( basename( __FILE__ ) );
        }

  
}

function brainytalk_load_plugin_textdomain() {
    load_plugin_textdomain( 'brainytalk', FALSE, basename( dirname( __FILE__ ) ) . '/langs/' );
}
add_action( 'plugins_loaded', 'brainytalk_load_plugin_textdomain' );


function plugin_get_version() {    
    if ( ! function_exists( 'get_plugins' ) )
        require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
        $plugin_folder = get_plugins( '/' . plugin_basename( dirname( __FILE__ ) ) );
        return $plugin_folder['brainytalk-chat.php']['Version'];
}

require_once ('framework/ws_options.php');
require_once ('framework/plugin_config.php');
require_once ('framework/constants.php');
require_once ('framework/settings.php');
require_once ('chat.php');

//Cria a classe de chat
new ws_chat();
?>