(function() {
  'use strict';

  appEvento.config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider){

	$urlRouterProvider.otherwise('/login');
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		
  	$stateProvider

	.state('home',{
		url: '/home',
		templateUrl: '/components/user/userInfo/user-info.html',
		controller: 'userInfoController',
		controllerAs: 'vm',
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

  appEvento.run(function ($rootScope, $state, $location, userService) {

		var rotasPermitidas = ["/login", "/suporte"];
		 
		$rootScope.$on('$locationChangeStart', function () {
			var path = $location.path(); 
			if(rotasPermitidas.indexOf(path) == -1) {
				userService.login()
				.then(function (response) {
					$rootScope.authenticated = true;
					$rootScope.username = response.data.principal;;
				})
				.catch(function () {
					$rootScope.authenticated = false;
					$state.go('login');
				})
			}	
		})
  })

})();








