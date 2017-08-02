<?php
/** Define todas as constantes necessárias para o funcionamento do plugin
 * @author Gabriel Stringari
 * @version 27/09/2015
 */
$widgetIdAdicionado="";
class ws_chat {
	function ws_chat(){
	    add_action( 'wp_enqueue_scripts', 'brainytalk_scripts_loader' );
	    add_action( 'wp_enqueue_scripts', 'brainytalk_styles_loader' );
		if (get_option('brainytalk_chat_api_key') != "")
	    	add_action( 'get_header', 'brainytalk_html_loader' );

		
	}
}

function brainytalk_html_loader(){	
    ?>
    
    

	<?php
      if((get_option('brainytalk_chat_api_key') != NULL) && (get_option('brainytalk_chat_api_key') != "") && ((get_option('brainy_chat_widget_id') == NULL) || (trim(get_option('brainy_chat_widget_id')) == ''))) {
	
  	    $tipobotaochat = "B"; //Barra
	 	if(get_option('brainytalk_chat_style') == 'brainytalk-icon'){
	 		$tipobotaochat = "C"; //icon	 
	 	}
		// The data to send to the API
		$postData = array(
    			'Token' => get_option('brainytalk_chat_api_key'),
    			'Model' => array(				
						'Id' => '00000000-0000-0000-0000-000000000000',
	    				'Descricao' => "WordPress Chat",
	    				'CodEmpresa' => "00000000-0000-0000-0000-000000000000",
	  					'SiteLogado' => "WordpressNovo",
	    				'Tipo' => "W",
	    				'TituloChat' => get_option('brainytalk_chat_titulo'),
	    				'TipoBotao' => $tipobotaochat,
	    				'CorPrincipal' => get_option('brainy_chat_default_color'),
	    				'CorTexto' => get_option('brainy_chat_default_color_text'),
	    				'CorShadow' => get_option('brainy_chat_default_color_shadow'),
	    				'CorCabecalho' => get_option('brainy_chat_default_color_header'),
    					'ImagemFundoURL' => get_option('brainy_chat_back_image'),
	  					'Linguagem' => "pt-BR"
  				
					)
			);

			$ch = curl_init('https://ws.brainytalk.com/widget');
				curl_setopt_array($ch, array(    			
    				CURLOPT_RETURNTRANSFER => TRUE,
    				CURLOPT_HTTPHEADER => array(
	        			'Content-Type: application/json'
    			),
    			CURLOPT_POSTFIELDS => json_encode($postData)
			));
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
			// Send the request
			$response = curl_exec($ch);

			// Check for errors
			if($response === FALSE){
    			die(curl_error($ch));
			}

			// Decode the response
			$responseData = json_decode($response);
            
			 add_option('brainy_chat_widget_id', $responseData->{'Id'});
        } ?>


<?php if((get_option('brainytalk_chat_api_key') != NULL) && (get_option('brainytalk_chat_api_key') != "") && ((get_option('brainy_chat_widget_id') != NULL) || (trim(get_option('brainy_chat_widget_id')) != ''))){?>
 <head>
     <script async src="https://api.brainytalk.com/widget/<?php echo get_option('brainy_chat_widget_id'); ?>/<?php echo get_locale() ?>"></script>
 </head>
  <?php }?>


<body>	
</body>
<?php
}