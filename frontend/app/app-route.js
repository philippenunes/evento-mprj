(function() {
  'use strict';

  appEvento.config(function($stateProvider, $urlRouterProvider, $locationProvider){

  	$urlRouterProvider.otherwise('/login');
  //	$locationProvider.html5Mode({
 	//  enabled: true,
  //	  requireBase: false
//	});

  	$stateProvider

		.state('home',{
			url: '/home',
			templateUrl: '/components/user/user-info.html',
			controller: 'userInfoController',
			controllerAs: 'vm'
		})

    .state('login',{
      url: '/login',
      templateUrl: '/components/user/user-login.html',
			controller: 'userLoginController',
			controllerAs: 'vm'
    })

  	.state('cadastrar',{
  		url: '/cadastrar',
  		templateUrl: '/components/evento/eventoCadastro/cadastro-evento.html',
      controller: 'cadastroController',
			controllerAs: 'vm'
  	})

  	.state('listar',{
  		url: '/listar',
  		templateUrl: '/components/evento/eventoLista/lista-evento.html',
			controller: 'listaEventoController',
			controllerAs: 'vm'
  	})

		 .state('alterar',{
  		url: '/alterar',
  		templateUrl: '/components/evento/eventoAltera/altera-evento.html',
			controller: 'alteraEventoController',
			controllerAs: 'vm',
			params: {
				evento : {}
			}
  	})

		.state('suporte',{
  		url: '/suporte',
  		templateUrl: '/components/suporte/suporte.html',
  	})

  });

})();








