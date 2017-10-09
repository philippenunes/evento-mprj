(function() {
  'use strict';

  appEvento.config(function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider){

		$urlRouterProvider.otherwise('/login');
		
  	$stateProvider

	.state('home',{
		url: '/home',
		templateUrl: '/components/user/userInfo/user-info.html',
		controller: 'userInfoController',
		controllerAs: 'vm'
	})

    .state('login',{
      url: '/login',
      templateUrl: '/components/user/userLogin/user-login.html',
			controller: 'userLoginController',
			controllerAs: 'vm'
    })

  	.state('cadastrar',{
  		url: '/cadastrar',
  		templateUrl: '/components/evento/eventoCadastro/cadastro-evento.html',
      	controller: 'cadastroController',
		controllerAs: 'vm',
		resolve: {

		}
  	})

  	.state('listar',{
  		url: '/listar',
  		templateUrl: '/components/evento/eventoLista/lista-evento.html',
			controller: 'listaEventoController',
			controllerAs: 'vm'
		})
	.state('listar.detalhes', {
		url: "/detalhes",
		templateUrl: '/components/evento/eventoDetalhe/detalhe-evento.html',
		controller: 'detalheEventoController',
		controllerAs: 'vm',
		params: {
			evento: {}
		} 
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

  appEvento.run(function ($rootScope, $state, $location) {

		var rotasPermitidas = [];
		var rotaSuporte = "/suporte";
		var rotaLogin = "/login";
		rotasPermitidas.push(rotaLogin, rotaSuporte);
		var path = $location.path();
	  
		$rootScope.$on('$locationChangeStart', function () {		
			if(($rootScope.authenticated == null || false) && (rotasPermitidas.indexOf(path) == -1)) {
				$state.go('login'); 
			}
		})

  })

})();








