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
        name: '1장 Angualr의 소개와 특징',
        children: [
          {name: '1.1 Angular 소개', link: ''},
          {name: '1.2 Angular와 AngularJS의 차이점', link: ''},
          {
            name: '1.3 Angular의 장점',
            children: [
              {name: '1.3.1 개선된 개발 생산성', link: ''},
              {name: '1.3.2 성능의 향상', link: ''},
            ]
          },
          {name: '1.4 브라우저 지원 범위', link: ''},
        ]
      }, {
        name: '2장 Node.js와 npm',
        children: [
          {
            name: '2.1 Node.js',
            children: [
              {name: '2.1.1 Node.js 개요', link: ''},
              {name: '2.1.2 Node.js 설치', link: ''},
              {name: '2.1.3 Node.js REPL', link: ''},
              {name: '2.1.4 Node.js 맛보기', link: ''},
            ]
          },
          {
            name: '2.2 npm',
            children: [
              {name: '2.2.1 npm 개요', link: ''},
              {name: '2.2.2 npm 설치', link: ''},
              {name: '2.2.3 npm을 사용한 패키지 설치', link: ''},
              {name: '2.2.4 지역 설치와 전역 설치', link: ''},
              {name: '2.2.5 package.json과 의존성 관리', link: ''},
            ]
          },
        ]
      }, {
        name: '3장 ECMAScript 6',
        children: [
          {
            name: '3.1 let, const와 블록 레벨 스코프',
            children: [
              {name: '3.1.1 let', link: '/chap3/let'},
              {name: '3.1.2 const', link: '/chap3/const'}
            ]
          }, {
            name: '3.2 템플릿 리터럴', link: '/chap3/template-literal'
          }, {
            name: '3.3 화살표 함수',
            children: [
              {name: '3.3.1 화살표 함수', link: '/chap3/arrow-function'},
              {name: '3.3.2 this', link: '/chap3/this'}
            ]
          }, {
            name: '3.4 파라미터 기본값', link: '/chap3/default-value-of-parameters'
          }, {
            name: '3.5 Rest 파라미터', link: '/chap3/rest-parameters'
          }, {
            name: '3.6 Spread 연산자', link: '/chap3/spread-operator'
          }, {
            name: '3.7 객체 리터럴 프로퍼티 기능 확장',
            children: [
              {name: '프로퍼티 축약 표현', link: ''},
              {name: '프로퍼티 이름 조합', link: ''},
              {name: '메소드 축약 표현', link: ''},
              {name: '__proto__ 프로퍼티에 의한 상속', link: ''},
            ]
          }, {
            name: '3.8 디스트럭처링',
            children: [
              {name: '배열 디스트럭처링', link: ''},
              {name: '객체 디스트럭처링', link: ''},
            ]
          }, {
            name: '3.9 클래스',
            children: [
              {name: '클래스 정의', link: ''},
              {name: '클래스 프로퍼티', link: ''},
              {name: '호이스팅', link: ''},
              {name: 'getter, setter', link: ''},
              {name: '정적 메소드', link: ''},
              {name: '클래스 상속', link: ''},
            ]
          }, {
            name: '3.10 프로미스',
            children: [
              {name: '콜백 패턴의 단점', link: ''},
              {name: '프로미스의 생성 및 사용', link: ''},
              {name: '프로미스 에러 처리', link: ''},
              {name: '프로미스 체이닝', link: ''},
            ]
          }, {
            name: '3.11 이터레이션 프로토콜과 for-of 루프',
            children: [
              {name: '이터레이션 프로토콜', link: ''},
              {name: 'for-of 루프', link: ''},
              {name: '커스텀 이터러블', link: ''},
            ]
          }, {
            name: '3.12 Symbol',
            children: [
              {name: 'Symbol 생성 및 사용', link: ''},
              {name: 'Symbol 객체', link: ''},
            ]
          }, {
            name: '3.13 제너레이터',
            children: [
              {name: '제너레이터 함수 생성 및 호출', link: ''},
              {name: '이터러블의 구현', link: ''},
            ]
          }, {
            name: '3.14 모듈',
            children: [
              {name: '모듈이란?', link: ''},
              {name: 'export', link: ''},
              {name: 'import', link: ''},
            ]
          }, {
            name: '3.15 Babel과 Webpack을 이용한 ES6 개발환경 구축',
            children: [
              {name: 'Babel CLI 설치', link: ''},
              {name: '.babelrc 설정 파일 작성', link: ''},
              {name: '트랜스파일링', link: ''},
              {name: 'ES6 개발환경 구축', link: ''},
            ]
          },
        ]
      }, {
        name: '4장 TypeScript',
        children: [
          {name: '4.1 TypeScript 개요', link: ''},
          {name: '4.2 TypeScript의 장점', link: ''},
          {name: '4.3 TypeScript 개발환경 구축', link: ''},
          {
            name: '4.4 정적 타이핑',
            children: [
              {name: '4.4.1 타입 선언', link: ''},
              {name: '4.4.2 정적 타이핑', link: ''},
              {name: '4.4.3 타입 추론', link: ''},
            ]
          }, {
            name: '4.5 클래스',
            children: [
              {name: '4.5.1 클래스 정의', link: ''},
              {name: '4.5.2 접근 제한자', link: ''},
              {name: '4.5.3 생성자 파라미터에 접근 제한자 선언', link: ''},
              {name: '4.5.4 readonly 키워드', link: ''},
              {name: '4.5.5 static 키워드', link: ''},
              {name: '4.5.6 추상 클래스', link: ''},
            ]
          }, {
            name: '4.6 인터페이스',
            children: [
              {name: '4.6.1 변수와 인터페이스', link: ''},
              {name: '4.6.2 함수와 인터페이스', link: ''},
              {name: '4.6.3 클래스와 인터페이스', link: ''},
              {name: '4.6.4 덕 타이핑', link: ''},
              {name: '4.6.5 선택적 프로퍼티', link: ''},
            ]
          }, {
            name: '4.7 제네릭', link: ''
          }
        ]
      }, {
        name: '5장 Angular CLI',
        children: [
          {name: '5.1 Angular CLI란?', link: ''},
          {name: '5.2 Angular CLI 설치', link: ''},
          {name: '5.3 프로젝트 생성', link: ''},
          {name: '5.4 프로젝트 실행', link: ''},
          {
            name: '5.5 프로젝트 구성요소 생성',
            children: [
              {name: '5.5.1 컴포넌트 생성', link: ''},
              {name: '5.5.2 디렉티브 생성', link: ''},
              {name: '5.5.3 모듈 생성', link: ''},
              {name: '5.5.4 서비스 생성', link: ''},
              {name: '5.5.5 클래스 생성', link: ''},
            ]
          }, {
            name: '5.6 프로젝트 빌드',
            children: [
              {name: '5.6.1 트랜스파일링과 의존 모듈 번들링', link: ''},
              {name: '5.6.2 프로덕션 빌드와 배포', link: ''},
              {name: '5.6.3 AoT 컴파일', link: ''},
            ]
          }, {
            name: '5.7 기본 옵션 변경', link: ''
          }
        ]
      }, {
        name: '7장 컴포넌트',
        children: [
          {
            name: '7.1 소개',
            children: [
              {name: '7.1.1 웹 컴포넌트', link: ''},
              {name: '7.1.2 컴포넌트 트리', link: ''},
            ]
          }, {
            name: '7.2 컴포넌트 기본 구조',
            children: [
              {name: '7.2.1 컴포넌트와 코드 구조', link: ''},
              {name: '7.2.2 컴포넌트의 기본 동작 구조', link: ''},
            ]
          }, {
            name: '7.3 컴포넌트 작성 실습',
            children: [
              {name: '7.3.1 네이밍 컨벤션', link: ''},
              {name: '7.3.2 컴포넌트 클래스', link: ''},
              {name: '7.3.3 @Component 데코레이터', link: ''},
              {name: '7.3.4 Angular 라이브러리 모듈 임포트', link: ''},
              {name: '7.3.5 메타데이터', link: ''},
              {name: '7.3.6 컴포넌트 클래스와 템플릿의 연동', link: ''},
              {name: '7.3.7 컴포넌트의 호출', link: ''},
              {name: '7.3.8 모듈에 컴포넌트 등록', link: ''},
            ]
          }, {
            name: '7.4 템플릿과 템플릿 문법',
            children: [
              {name: '7.4.1 템플릿이란?', link: ''},
              {name: '7.4.2 템플릿 문법', link: ''},
            ]
          }, {
            name: '7.5 데이터 바인딩',
            children: [
              {name: '7.5.1 데이터 바인딩이란?', link: ''},
              {name: '7.5.2 변화 감지', link: ''},
              {name: '7.5.3 데이터 바인딩', link: ''},
            ]
          }, {
            name: '7.6 빌트인 디렉티브',
            children: [
              {name: '7.6.1 빌트인 디렉티브란?', link: ''},
              {name: '7.6.2 빌트인 어트리뷰트 디렉티브', link: ''},
              {name: '7.6.3 빌트인 구조 디렉티브', link: ''},
            ]
          }, {
            name: '7.7 템플릿 참조 변수', link: ''
          }, {
            name: '7.8 세이프 네비게이션 연산자', link: ''
          }, {
            name: '7.9 컴포넌트 간의 상태 공유',
            children: [
              {name: '7.9.1 컴포넌트의 계층적 트리 구조', link: ''},
              {name: '7.9.2 부모 컴포넌트에서 자식 컴포넌트로 상태 전달', link: ''},
              {name: '7.9.3 자식 컴포넌트에서 부모 컴포넌트로 상태 전달', link: ''},
              {name: '7.9.4 Stateful 컴포넌트와 Stateless 컴포넌트', link: ''},
              {name: '7.9.5 원거리 컴포넌트 간의 상태 공유', link: ''},
            ]
          }, {
            name: '7.10 부모 컴포넌트에서 자식 요소로의 접근',
            children: [
              {name: '7.10.1 @ViewChild와 @ViewChildren', link: ''},
              {name: '7.10.2 @ContentChild와 @ContentChildren', link: ''},
            ]
          }, {
            name: '7.11 컴포넌트와 스타일',
            children: [
              {name: '7.11.1 컴포넌트 스타일', link: ''},
              {name: '7.11.2 뷰 캡슐화', link: ''},
              {name: '7.11.3 Shadow DOM 스타일 셀렉터', link: ''},
              {name: '7.11.4 글로벌 스타일', link: ''},
              {name: '7.11.5 Angular CLI로 Sass 적용 프로젝트 생성', link: ''},
            ]
          }
        ]
      }, {
        name: '8장 디렉티브',
        children: [
          {name: '8.1 디렉티브', link: ''},
          {name: '8.2 디렉티브의 종류', link: ''},
          {
            name: '8.3 사용자 정의 어트리뷰트 디렉티브',
            children: [
              {name: '8.3.1 사용자 정의 어트리뷰트 디렉티브의 생성', link: ''},
              {name: '8.3.2 이벤트 처리', link: ''},
              {name: '8.3.3 @Input 데이터 바인딩', link: ''},
            ]
          }, {
            name: '8.4 사용자 정의 구조 디렉티브',
            children: [
              {name: '8.4.1 사용자 정의 구조 디렉티브의 생성', link: ''},
              {name: '8.4.2 ng-template 디렉티브', link: ''},
              {name: '8.4.3 TemplateRef와 ViewContainerRef', link: ''},
              {name: '8.4.4 ng-container 디렉티브', link: ''},
            ]
          }
        ]
      }, {
        name: '9장 파이프',
        children: [
          {name: '9.1 파이프란?', link: ''},
          {name: '9.2 빌트인 파이프', link: ''},
          {name: '9.3 체이닝 파이프', link: ''},
          {name: '9.4 커스텀 파이프', link: ''},
          {name: '9.5 파이프와 변화 감지', link: ''},
          {name: '9.6 순수 파이프와 비순수 파이프', link: ''},
        ]
      }, {
        name: '10장 생명주기와 훅 메소드',
        children: [
          {name: '10.1 생명주기', link: ''},
          {name: '10.2 생명주기 훅 메소드', link: ''},
          {
            name: '10.3 생명주기 훅 메소드 실습',
            children: [
              {name: '10.3.1 컴포넌트 생명주기 훅 메소드', link: ''},
              {name: '10.3.2 ngOnChanges와 ngDoCheck', link: ''},
              {name: '10.3.3 디렉티브 생명주기 훅 메소드', link: ''},
            ]
          },
        ]
      }, {
        name: '11장 서비스',
        children: [
          {name: '11.1 서비스란?', link: ''},
          {name: '11.2 의존성 주입', link: ''},
          {
            name: '11.3 인젝터와 인젝터 트리',
            children: [
              {name: '11.3.1 인젝터', link: ''},
              {name: '11.3.2 인젝터 트리', link: ''},
            ]
          },
          {
            name: '11.4 프로바이더',
            children: [
              {name: '11.4.1 클래스 프로바이더', link: ''},
              {name: '11.4.2 값 프로바이더', link: ''},
              {name: '11.4.3 팩토리 프로바이더', link: ''},
            ]
          },
          {name: '11.5 인젝션 토큰', link: ''},
          {name: '11.6 선택적 의존성 주입', link: ''},
          {name: '11.7 서비스 중재자 패턴', link: ''},
        ]
      }, {
        name: '12장 리액티브 프로그래밍과 RxJS 개요',
        children: [
          {name: '12.1 리액티브 프로그래밍이란?', link: ''},
          {name: '12.2 리액티브 프로그래밍의 특징', link: ''},
          {name: '12.3 RxJS 임포트', link: ''},
          {name: '12.4 옵저버블과 옵저버', link: ''},
          {name: '12.5 Cold observable과 Hot observable', link: ''},
          {name: '12.6 유니캐스트와 멀티캐스트', link: ''},
          {name: '12.7 오퍼레이터', link: ''},
          {name: '12.8 옵저버블 이벤트 스트림 예제', link: ''},
        ]
      }, {
        name: '13장 HTTP 통신',
        children: [
          {name: '13.1 HttpClient', link: ''},
          {name: '13.2 HttpClientModule', link: ''},
          {
            name: '13.3 HTTP 요청',
            children: [
              {name: '13.3.1 REST API Mock 서버 구축', link: ''},
              {name: '13.3.2 GET', link: ''},
              {name: '13.3.3 POST', link: ''},
              {name: '13.3.4 PUT', link: ''},
              {name: '13.3.5 PATCH', link: ''},
              {name: '13.3.6 DELETE', link: ''},
            ]
          },
          {name: '13.4 HTTP 요청 중복 방지', link: ''},
          {name: '13.5 인터셉터', link: ''},
        ]
      }, {
        name: '14장 폼과 유효성 검증 모듈',
        children: [
          {
            name: '14.1 폼이란?',
            children: [
              {name: '14.1.1 HTML 표준 폼', link: ''},
              {name: '14.1.2 Angular 폼', link: ''},
            ]
          },
          {
            name: '14.2 템플릿 기반 폼',
            children: [
              {name: '14.2.1 템플릿 기반 폼이란?', link: ''},
              {name: '14.2.2 템플릿 기반 폼의 중심 디렉티브', link: ''},
              {name: '14.2.3 NgModel과 양방향 바인딩', link: ''},
              {name: '14.2.4 템플릿 기반 폼 유효성 검증', link: ''},
              {name: '14.2.5 템플릿 기반 폼 유효성 검증 실습', link: ''},
            ]
          },
          {
            name: '14.3 리액티브 폼',
            children: [
              {name: '14.3.1 리액티브 폼이란?', link: ''},
              {name: '14.3.2 리액티브 폼의 중심 클래스와 디렉티브', link: ''},
              {name: '14.3.3 리액티브 폼 유효성 검증', link: ''},
              {name: '14.3.4 사용자 정의 검증기', link: ''},
              {name: '14.3.5 리액티브 폼 유효성 검증 실습', link: ''},
              {name: '14.3.6 FormBuilder', link: ''},
            ]
          },
        ]
      }, {
        name: '15장 모듈',
        children: [
          {name: '15.1 모듈이란?', link: ''},
          {name: '15.2 @NgModule 데코레이터', link: ''},
          {name: '15.3 라이브러리 모듈', link: ''},
          {name: '15.4 루트 모듈', link: ''},
          {
            name: '15.5 모듈의 분리',
            children: [
              {name: '15.5.1 기능 모듈', link: ''},
              {name: '15.5.2 공유 모듈', link: ''},
              {name: '15.5.3 핵심 모듈', link: ''},
            ]
          },
        ]
      }, {
        name: '16장 라우팅과 네비게이션',
        children: [
          {name: '16.1 단일 페이지 애플리케이션', link: ''},
          {name: '16.2 라우팅', link: ''},
          {
            name: '16.3 Angular 라우터 개요와 위치 정책',
            children: [
              {name: '16.3.1 개요', link: ''},
              {name: '16.3.2 위치 정책', link: ''},
            ]
          },
          {
            name: '16.4 라우터 구성요소',
            children: [
              {name: '16.4.1 라우트 구성', link: ''},
              {name: '16.4.2 라우트 등록', link: ''},
              {name: '16.4.3 뷰의 렌더링 위치 지정과 네비게이션 작성', link: ''},
            ]
          },
          {name: '16.5 navigate 메소드', link: ''},
          {
            name: '16.6 라우터 상태',
            children: [
              {name: '16.6.1 라우트 파라미터 전달', link: ''},
              {name: '16.6.2 라우트 파라미터 취득', link: ''},
              {name: '16.6.3 라우트 정적 데이터', link: ''},
            ]
          },
          {name: '16.7 자식 라우트', link: ''},
          {name: '16.8 모듈의 분리와 모듈별 라우터 구성', link: ''},
          {
            name: '16.9 라우트 가드',
            children: [
              {name: '16.9.1 CanActivate', link: ''},
              {name: '16.9.2 CanActivateChild', link: ''},
              {name: '16.9.3 CanLoad', link: ''},
              {name: '16.9.4 Resolve', link: ''},
              {name: '16.9.5 CanDeactivate', link: ''},
            ]
          },
        ]
      }
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
