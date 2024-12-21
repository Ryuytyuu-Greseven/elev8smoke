import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-cigars',
  templateUrl: './dashboard-cigars.component.html',
  styleUrls: ['./dashboard-cigars.component.css'],
})
export class DashboardCigarsComponent {
  allCigars: any[] = [
    {
      id: '1',
      name: 'Decaprio',
      code: 'decaprio',
      price: 8,
      quantity: 60,
      img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Ftwo-high-quality-cigars-against-white-backdrop_908985-43564.jpg&f=1&nofb=1&ipt=2b5f1b5739e3e482171025e47873e9071a5e81edd36613965347076a407bcf40&ipo=images',
    },
    {
      id: '2',
      name: 'Titanic',
      code: 'decaprio',
      price: 8,
      quantity: 60,
      img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xoQtO73FoUYL7y3HZWcAngHaE7%26pid%3DApi&f=1&ipt=a856c28c345ec196d71c53d1dd09ff4c878151e122073d892599e0e4ed80f643&ipo=images',
    },
    {
      id: '3',
      name: 'Casino',
      code: 'decaprio',
      price: 8,
      quantity: 60,
      img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.kXOiQrxoOqivP9SZFUZ4DgHaE7%26pid%3DApi&f=1&ipt=a16e7ad4163529e79551871d5096cd96fe42ee5cd3cb2375a41743f4f86eecc2&ipo=images',
    },
    {
      id: '4',
      name: 'Trusnimna Scoda',
      code: 'decaprio',
      price: 8,
      quantity: 60,
      img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.3vbSwQKKUv09iFgy2_D3rAAAAA%26pid%3DApi&f=1&ipt=2c3c24cc45f28f069456bb881fd6af6ebf286d80bd36bd018b84cf5531e118c8&ipo=images',
    },
    {
      id: '5',
      name: 'Smokin',
      code: 'decaprio',
      price: 8,
      quantity: 60,
      img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.HiddPFVTbeZ8y64_uN5lJwHaHa%26pid%3DApi&f=1&ipt=dea67c85fec59286e7cb75de03ede7983c9183d338242dbe7c5fc6cd8d10e6ff&ipo=images',
    },
  ];
}
