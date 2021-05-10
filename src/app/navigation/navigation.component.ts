import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

interface FoodNode {
  name: string;
  link?: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: '라우팅 예제',
    children: [
      {name: 'Home', link: '/home'},
      {name: 'Service', link: '/service'},
      {name: 'About', link: '/about'},
    ]
  }, {
    name: 'Angular Essential',
    children: [
      {
        name: '3장 ECMAScript 6',
        children: [
          {name: '3.1 let, const와 블록 레벨 스코프', link: '/chap3/letconst'},
        ]
      }, {
        name: '7.5 데이터 바인딩',
        children: [
          {name: 'a', link: ''},
        ]
      }, {
        name: '7.6 빌트인 디렉티브',
        children: [
          {name: 'a', link: ''},
        ]
      }, {
        name: '7.7 템플릿 참조 변수',
        children: [
          {name: 'a', link: ''},
        ]
      },
    ]
  },
];

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}
