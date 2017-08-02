<?php
add_action('admin_menu', 'add_brainytalk_chat_menu');

//Adiciona um menu chamando função de callback get_brainytalk_menu
function add_brainytalk_chat_menu(){
    $lUrlIconeMenu = plugin_dir_url(__FILE__) . "admin/images/bt-icon.png";
	add_menu_page('BrainyTalk Chat', 'BrainyTalk Chat', 'manage_options', 'brainytalk-chat','get_brainytalk_menu', $lUrlIconeMenu);

	//Permite o upload de arquivos nas configurações
	if(function_exists( 'wp_enqueue_media' )){
		wp_enqueue_media();
	}else{
		wp_enqueue_style('thickbox');
		wp_enqueue_script('media-upload');
		wp_enqueue_script('thickbox');
	}


	wp_localize_script( 'jquery', 'objectL10n', array(
	'confirmacaoemail' => esc_html__( 'Confirmação de e-mail', 'brainytalk' ),
	'enviamosemailpara' => esc_html__( 'Enviamos um e-mail para', 'brainytalk' ),
	'confirmeemaillogin' => esc_html__( 'Confirme seu e-mail através deste e faça login em sua conta', 'brainytalk' ),
	'errocadastro' => esc_html__( 'Ocorreu um erro no cadastro. Tente novamente!', 'brainytalk' ),
	'sucessologin' => esc_html__( 'Login efetuado com sucesso', 'brainytalk' ),
	'erroautenticacao' => esc_html__( 'Ocorreu um erro na autenticação. Tente novamente!', 'brainytalk' ),
	'necessarioconfirmaremail' => esc_html__( 'É necessário confirmar o seu endereço de e-mail.', 'brainytalk' ),
	'emailesenhaerrados' => esc_html__( 'O e-mail e a senha digitados não coincidem. Tente novamente!', 'brainytalk' ),
	'errosalvarconfiguracoes' => esc_html__('Erro salvando as configurações. Tente novamente!', 'brainytalk'),
	'configuracoessalvas' => esc_html__('Configurações salvas com sucesso!', 'brainytalk'),
	'emailenviado' => esc_html__('E-mail enviado!', 'brainytalk'),
	'erroenviandoemail' => esc_html__('Erro ao enviar e-mail!', 'brainytalk'),
	'bemvindo' => esc_html__('Bem Vindo', 'brainytalk'),
	'locale'=> get_locale(),
	'CertezaRestore' => esc_html__('Você tem certeza?', 'brainytalk'),
    'TextRestore' => esc_html__('As definições de cor e a imagem de fundo serão alteradas para o padrão! Você poderá configurar novamente depois.', 'brainytalk'),
	'ConfirmRestore' => esc_html__('Sim, restaurar!', 'brainytalk'),
	'CancelRestore' => esc_html__('Cancelar', 'brainytalk')
));
}?>