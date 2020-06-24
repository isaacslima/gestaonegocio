export default function () {
  return [{
    title: 'Dashboard',
    to: {
      name: 'home',
    },
    htmlBefore: '<i class="material-icons">edit</i>',
    htmlAfter: '',
  },
  {
    title: 'Cadastro Clientes',
    htmlBefore: '<i class="material-icons">group</i>',
    to: {
      name: 'cadastro-clientes',
    },
  },
  {
    title: 'Cadastro Serviços',
    htmlBefore: '<i class="material-icons">build</i>',
    to: {
      name: 'cadastro-servicos',
    },
  },
  {
    title: 'Entradas',
    htmlBefore: '<i class="material-icons">build</i>',
    to: {
      name: 'entradas',
    },
  },
  {
    title: 'Saídas',
    htmlBefore: '<i class="material-icons">build</i>',
    to: {
      name: 'saidas',
    },
  },
  {
    title: 'Forms & Components',
    htmlBefore: '<i class="material-icons">view_module</i>',
    to: {
      name: 'components-overview',
    },
  },
  // {
  //   title: 'User Profile',
  //   htmlBefore: '<i class="material-icons">person</i>',
  //   to: {
  //     name: 'user-profile-lite',
  //   },
  // }
  ];
}
