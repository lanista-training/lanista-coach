import * as React from "react";
import Dashboard from './Dashboard';
import Router from 'next/router';
import _ from 'lodash';

import Scene from "../../components/Scene";
import Filter from "../../components/feeds/Filter"

class DashboardWithoutMutation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentScrollPosition: 0,
      dataSource: [],
      filter: undefined,
      translations: [],
    }
    this.goBack = this.goBack.bind(this);
    this.onFilterByTime = this.onFilterByTime.bind(this);
    this.onFilterByType = this.onFilterByType.bind(this);
    this.jumpToDay = this.jumpToDay.bind(this);
    this.jumpToStart = this.jumpToStart.bind(this);
    this.t = this.t.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
  }

  componentDidMount() {
    let dataSource = _.groupBy(feeds, o => o.customer.target_date.toLocaleString().split(',')[0].split( ".").join("-"));
    dataSource = _.reduce(dataSource, (acc, next, index) => {
      acc.push({
        title: index,
        data: next
      });
      return acc;
    }, []);
    this.setState({
      dataSource: dataSource,
    });
    this.onChangeLanguage("de");
  }

  goBack() {
    Router.back();
  }

  goToCustomers() {
    const {history} = this.props;
    Router.push("/customers");
  }

  onFilterByTime() {
    console.log("Filter by past events");
  }

  onFilterByType(newFilter) {
    console.log("FILTER BY: " + newFilter);
    const {dataSource, filter} = this.state;
    let tmp = feeds;

    if( filter != newFilter ) {
      tmp = feeds.filter( feed => feed.type == newFilter );
    }
    let newDataSource = _.groupBy(tmp, o => o.customer.target_date.toLocaleString().split(',')[0].split( ".").join("-"));
    newDataSource = _.reduce(newDataSource, (acc, next, index) => {
      acc.push({
        title: index,
        data: next
      });
      return acc;
    }, []);
    this.setState({
      dataSource: newDataSource,
      filter: filter == newFilter ? undefined : newFilter,
    });
  }

  jumpToDay(day) {
    // CALCULATE THE CURRENT POSSITION OF THE FIRST ELEMENT FROM TODAY
    console.log("day selectd", day);
    const {dataSource} = this.state;
    var dateFormatted = new Date(day.getFullYear(),day.getMonth(),day.getDate());
    console.log("dateFormatted index: ", dateFormatted);
    var counter = 0;
    var found = false;
    console.log("datas: ",dataSource);
    for( var i = 0; i < dataSource.length && !found; i++) {
      const tmp = dataSource[i].title.split("-");
      const myDate = new Date(tmp[2], tmp[1]-1, tmp[0]);
      if( myDate.getTime() === dateFormatted.getTime()  ) {
        found = true;
      } else {
        counter = counter + dataSource[i].data.length;
      }
    };

    console.log("counter: ", counter);
    this.setState({
      currentScrollPosition: counter
    })
  }

  jumpToStart() {
    if( this.state.currentScrollPosition == 0) {
      this.setState({
        currentScrollPosition: 100
      })
    } else {
      this.setState({
        currentScrollPosition: -1
      }, () => {
        this.setState({
          currentScrollPosition: 0
        })
      })
    }
  }

  t(text) {
    const {translations} = this.state;
    const textWithoutNamespace = text.split(":");
    const translation = translations[textWithoutNamespace[textWithoutNamespace.length-1]];
    return (translation ? translation : text);
  }

  onChangeLanguage( language ) {
    const translations = require('../../../static/locales/' + language + '/dashboard');
    const commonTranslations = require('../../../static/locales/' + language + '/common');
    const originalLanguages = ['en', 'de', 'es', 'fr'];

    this.setState({
      translations: {...translations, ...commonTranslations},
      currentLanguage: language,
      availableLanguages: originalLanguages.filter(word => word !== language)
    });
  }

  render() {
    const {dataSource, filter} = this.state;
    const commandsRight = [{
        icon: 'icon-customer-inactive',
        iosname: 'customer-inactive',
        text: '',
        type: 'type-4',
        typex: 'Ionicons',
        name: 'people',
        onTap: () => {
          console.log("Command Customers");
          this.goToCustomers();
        }
    }, {
        //icon: CustomerIcon,
        icon: 'icon-exercise-inactive',
        iosname: 'exercise-inactive',
        text: '',
        type: 'type-4',
        typex: 'Ionicons',
        name: 'exercises',
        onTap: () => {
          console.log("Command Exercises");
        }
    }, {
        //icon: CustomerIcon,
        icon: 'icon-training-plan-inactive',
        iosname: 'workout-inactive',
        text: '',
        type: 'type-4',
        typex: 'Ionicons',
        name: 'calendar',
        onTap: () => {
          console.log("Command Workouts");
        }
    }];

    const commandsLeft = [{
        //icon: CustomerIcon,
        icon: 'icon-tools-inactive',
        iosname: 'tools-inactive',
        text: 'Setting',
        type: 'type-1',
        typex: 'Ionicons',
        name: 'settings',
        onTap: () => {
          console.log("Command Settings");
        }
    }, {
        //icon: HelpIcon,
        icon: 'icon-help-inactive',
        iosname: 'help-inactive',
        text: 'Help',
        type: 'type-1',
        typex: 'Ionicons',
        name: 'help-circle',
        onTap: () => {
          console.log("Command Help");
        }
    }];

    return (
      <Scene
        commandsLeft={commandsLeft}
        commandsRight={commandsRight}
        headerChildren={
          <Filter
            onFilterByTime={this.jumpToStart}
            onFilterByType={this.onFilterByType}
            filter={filter}
          />
        }
        processing={false}
        t={this.t}
      >
        <Dashboard
          t={this.t}
          goBack={this.goBack}
          feeds={dataSource}
          currentScrollPosition={this.state.currentScrollPosition}
          jumpToDay={this.jumpToDay}
        />
      </Scene>
    );
  }
}

const feeds = [
  {
    "type": "WKA",
    "customer": {
      "id": 0,
      "first_name": "Elizabeth",
      "last_name": "Rodriguez",
      "photoUrl": "https://randomuser.me/api/portraits/women/0.jpg"
    }
  },
  {
    "type": "ACT",
    "customer": {
      "id": 1,
      "first_name": "Martha",
      "last_name": "Clarke",
      "photoUrl": "https://randomuser.me/api/portraits/women/1.jpg"
    }
  },
  {
    "type": "BRD",
    "customer": {
      "id": 2,
      "first_name": "Margery",
      "last_name": "Harper",
      "photoUrl": "https://randomuser.me/api/portraits/women/2.jpg"
    }
  },
  {
    "type": "BRD",
    "customer": {
      "id": 3,
      "first_name": "Walls",
      "last_name": "Cooley",
      "photoUrl": "https://randomuser.me/api/portraits/women/3.jpg"
    }
  },
  {
    "type": "ARQ",
    "customer": {
      "id": 4,
      "first_name": "Peggy",
      "last_name": "Gonzalez",
      "photoUrl": "https://randomuser.me/api/portraits/men/4.jpg"
    }
  },
  {
    "type": "WKE",
    "customer": {
      "id": 5,
      "first_name": "Gross",
      "last_name": "Eaton",
      "photoUrl": "https://randomuser.me/api/portraits/men/5.jpg"
    }
  },
  {
    "type": "APT",
    "customer": {
      "id": 6,
      "first_name": "Kimberley",
      "last_name": "Carroll",
      "photoUrl": "https://randomuser.me/api/portraits/women/6.jpg"
    }
  },
  {
    "type": "WKA",
    "customer": {
      "id": 7,
      "first_name": "Evans",
      "last_name": "Mayer",
      "photoUrl": "https://randomuser.me/api/portraits/men/7.jpg"
    }
  },
  {
    "type": "ACT",
    "customer": {
      "id": 8,
      "first_name": "Diaz",
      "last_name": "Morrow",
      "photoUrl": "https://randomuser.me/api/portraits/men/8.jpg"
    }
  },
  {
    "type": "MSG",
    "customer": {
      "id": 9,
      "first_name": "Brandy",
      "last_name": "Hopper",
      "photoUrl": "https://randomuser.me/api/portraits/women/9.jpg"
    }
  },
  {
    "type": "WKA",
    "customer": {
      "id": 10,
      "first_name": "Nichols",
      "last_name": "Nieves",
      "photoUrl": "https://randomuser.me/api/portraits/men/10.jpg"
    }
  },
  {
    "type": "ARQ",
    "customer": {
      "id": 11,
      "first_name": "Moss",
      "last_name": "Gordon",
      "photoUrl": "https://randomuser.me/api/portraits/women/11.jpg"
    }
  },
  {
    "type": "ACT",
    "customer": {
      "id": 12,
      "first_name": "Finch",
      "last_name": "Sampson",
      "photoUrl": "https://randomuser.me/api/portraits/men/12.jpg"
    }
  },
  {
    "type": "ACT",
    "customer": {
      "id": 13,
      "first_name": "Guthrie",
      "last_name": "Wiggins",
      "photoUrl": "https://randomuser.me/api/portraits/women/13.jpg"
    }
  },
  {
    "type": "BRD",
    "customer": {
      "id": 14,
      "first_name": "Rowland",
      "last_name": "Mitchell",
      "photoUrl": "https://randomuser.me/api/portraits/men/14.jpg"
    }
  },
  {
    "type": "APT",
    "customer": {
      "id": 15,
      "first_name": "Elise",
      "last_name": "Vance",
      "photoUrl": "https://randomuser.me/api/portraits/men/15.jpg"
    }
  },
  {
    "type": "BRD",
    "customer": {
      "id": 16,
      "first_name": "Beulah",
      "last_name": "Zimmerman",
      "photoUrl": "https://randomuser.me/api/portraits/women/16.jpg"
    }
  },
  {
    "type": "WKA",
    "customer": {
      "id": 17,
      "first_name": "Luann",
      "last_name": "Copeland",
      "photoUrl": "https://randomuser.me/api/portraits/men/17.jpg"
    }
  },
  {
    "type": "WKE",
    "customer": {
      "id": 18,
      "first_name": "Marisa",
      "last_name": "Alvarado",
      "photoUrl": "https://randomuser.me/api/portraits/men/18.jpg"
    }
  },
  {
    "type": "APT",
    "customer": {
      "id": 19,
      "first_name": "Rowe",
      "last_name": "Hurst",
      "photoUrl": "https://randomuser.me/api/portraits/women/19.jpg"
    }
  },
  {
    "type": "BRD",
    "customer": {
      "id": 20,
      "first_name": "Marta",
      "last_name": "Bates",
      "photoUrl": "https://randomuser.me/api/portraits/women/20.jpg"
    }
  },
  {
    "type": "ACT",
    "customer": {
      "id": 21,
      "first_name": "Moses",
      "last_name": "Crawford",
      "photoUrl": "https://randomuser.me/api/portraits/women/21.jpg"
    }
  },
  {
    "type": "ARQ",
    "customer": {
      "id": 22,
      "first_name": "Chris",
      "last_name": "Whitfield",
      "photoUrl": "https://randomuser.me/api/portraits/men/22.jpg"
    }
  },
  {
    "type": "MSG",
    "customer": {
      "id": 23,
      "first_name": "Case",
      "last_name": "Greer",
      "photoUrl": "https://randomuser.me/api/portraits/women/23.jpg"
    }
  },
  {
    "type": "APT",
    "customer": {
      "id": 24,
      "first_name": "Conrad",
      "last_name": "Aguirre",
      "photoUrl": "https://randomuser.me/api/portraits/women/24.jpg"
    }
  },
  {
    "type": "ARQ",
    "customer": {
      "id": 25,
      "first_name": "Natalia",
      "last_name": "Knight",
      "photoUrl": "https://randomuser.me/api/portraits/men/25.jpg"
    }
  },
  {
    "type": "MSG",
    "customer": {
      "id": 26,
      "first_name": "Marguerite",
      "last_name": "Brady",
      "photoUrl": "https://randomuser.me/api/portraits/men/26.jpg"
    }
  },
  {
    "type": "APT",
    "customer": {
      "id": 27,
      "first_name": "Rosa",
      "last_name": "Justice",
      "photoUrl": "https://randomuser.me/api/portraits/women/27.jpg"
    }
  },
  {
    "type": "ACT",
    "customer": {
      "id": 28,
      "first_name": "Bowman",
      "last_name": "Estes",
      "photoUrl": "https://randomuser.me/api/portraits/women/28.jpg"
    }
  },
  {
    "type": "WKE",
    "customer": {
      "id": 29,
      "first_name": "Mcdonald",
      "last_name": "Mckenzie",
      "photoUrl": "https://randomuser.me/api/portraits/men/29.jpg"
    }
  },
  {
    "type": "MSG",
    "customer": {
      "id": 30,
      "first_name": "Blanchard",
      "last_name": "Berger",
      "photoUrl": "https://randomuser.me/api/portraits/women/30.jpg"
    }
  },
  {
    "type": "ARQ",
    "customer": {
      "id": 31,
      "first_name": "Lamb",
      "last_name": "Cruz",
      "photoUrl": "https://randomuser.me/api/portraits/men/31.jpg"
    }
  },
  {
    "type": "ACT",
    "customer": {
      "id": 32,
      "first_name": "Melendez",
      "last_name": "Logan",
      "photoUrl": "https://randomuser.me/api/portraits/men/32.jpg"
    }
  },
  {
    "type": "WKA",
    "customer": {
      "id": 33,
      "first_name": "Effie",
      "last_name": "Morris",
      "photoUrl": "https://randomuser.me/api/portraits/men/33.jpg"
    }
  },
  {
    "type": "BRD",
    "customer": {
      "id": 34,
      "first_name": "Neal",
      "last_name": "Hood",
      "photoUrl": "https://randomuser.me/api/portraits/men/34.jpg"
    }
  },
  {
    "type": "ARQ",
    "customer": {
      "id": 35,
      "first_name": "Donaldson",
      "last_name": "Cash",
      "photoUrl": "https://randomuser.me/api/portraits/men/35.jpg"
    }
  },
  {
    "type": "WKE",
    "customer": {
      "id": 36,
      "first_name": "Hansen",
      "last_name": "Walter",
      "photoUrl": "https://randomuser.me/api/portraits/women/36.jpg"
    }
  },
  {
    "type": "APT",
    "customer": {
      "id": 37,
      "first_name": "Robbins",
      "last_name": "Swanson",
      "photoUrl": "https://randomuser.me/api/portraits/men/37.jpg"
    }
  },
  {
    "type": "BRD",
    "customer": {
      "id": 38,
      "first_name": "Hewitt",
      "last_name": "Perry",
      "photoUrl": "https://randomuser.me/api/portraits/men/38.jpg"
    }
  },
  {
    "type": "MSG",
    "customer": {
      "id": 39,
      "first_name": "Nola",
      "last_name": "Rose",
      "photoUrl": "https://randomuser.me/api/portraits/women/39.jpg"
    }
  },
  {
    "type": "WKE",
    "customer": {
      "id": 40,
      "first_name": "Fletcher",
      "last_name": "Levy",
      "photoUrl": "https://randomuser.me/api/portraits/women/40.jpg"
    }
  },
  {
    "type": "ARQ",
    "customer": {
      "id": 41,
      "first_name": "Lynch",
      "last_name": "Kirkland",
      "photoUrl": "https://randomuser.me/api/portraits/women/41.jpg"
    }
  },
  {
    "type": "WKA",
    "customer": {
      "id": 42,
      "first_name": "Sherman",
      "last_name": "Miller",
      "photoUrl": "https://randomuser.me/api/portraits/men/42.jpg"
    }
  },
  {
    "type": "MSG",
    "customer": {
      "id": 43,
      "first_name": "Mccoy",
      "last_name": "Stanton",
      "photoUrl": "https://randomuser.me/api/portraits/women/43.jpg"
    }
  },
  {
    "type": "ACT",
    "customer": {
      "id": 44,
      "first_name": "Dina",
      "last_name": "Bauer",
      "photoUrl": "https://randomuser.me/api/portraits/men/44.jpg"
    }
  },
  {
    "type": "BRD",
    "customer": {
      "id": 45,
      "first_name": "Silvia",
      "last_name": "Gould",
      "photoUrl": "https://randomuser.me/api/portraits/women/45.jpg"
    }
  },
  {
    "type": "WKE",
    "customer": {
      "id": 46,
      "first_name": "Tonya",
      "last_name": "Tillman",
      "photoUrl": "https://randomuser.me/api/portraits/men/46.jpg"
    }
  },
  {
    "type": "APT",
    "customer": {
      "id": 47,
      "first_name": "Claudette",
      "last_name": "Burris",
      "photoUrl": "https://randomuser.me/api/portraits/men/47.jpg"
    }
  },
  {
    "type": "WKE",
    "customer": {
      "id": 48,
      "first_name": "Natasha",
      "last_name": "Anderson",
      "photoUrl": "https://randomuser.me/api/portraits/men/48.jpg"
    }
  },
  {
    "type": "WKE",
    "customer": {
      "id": 49,
      "first_name": "Elena",
      "last_name": "Wood",
      "photoUrl": "https://randomuser.me/api/portraits/men/49.jpg"
    }
  },
  {
    "type": "ACT",
    "customer": {
      "id": 50,
      "first_name": "Ilene",
      "last_name": "Gregory",
      "photoUrl": "https://randomuser.me/api/portraits/men/50.jpg"
    }
  },
  {
    "type": "WKE",
    "customer": {
      "id": 51,
      "first_name": "Annette",
      "last_name": "Reeves",
      "photoUrl": "https://randomuser.me/api/portraits/men/51.jpg"
    }
  },
  {
    "type": "BRD",
    "customer": {
      "id": 52,
      "first_name": "Mccarty",
      "last_name": "Cooper",
      "photoUrl": "https://randomuser.me/api/portraits/women/52.jpg"
    }
  },
  {
    "type": "MSG",
    "customer": {
      "id": 53,
      "first_name": "Susan",
      "last_name": "Goodman",
      "photoUrl": "https://randomuser.me/api/portraits/women/53.jpg"
    }
  },
  {
    "type": "WKE",
    "customer": {
      "id": 54,
      "first_name": "George",
      "last_name": "Booker",
      "photoUrl": "https://randomuser.me/api/portraits/women/54.jpg"
    }
  },
  {
    "type": "WKE",
    "customer": {
      "id": 55,
      "first_name": "Walker",
      "last_name": "Flores",
      "photoUrl": "https://randomuser.me/api/portraits/men/55.jpg"
    }
  },
  {
    "type": "APT",
    "customer": {
      "id": 56,
      "first_name": "Marian",
      "last_name": "Lee",
      "photoUrl": "https://randomuser.me/api/portraits/women/56.jpg"
    }
  },
  {
    "type": "WKA",
    "customer": {
      "id": 57,
      "first_name": "Greene",
      "last_name": "Mckinney",
      "photoUrl": "https://randomuser.me/api/portraits/men/57.jpg"
    }
  },
  {
    "type": "ACT",
    "customer": {
      "id": 58,
      "first_name": "Pennington",
      "last_name": "Kidd",
      "photoUrl": "https://randomuser.me/api/portraits/men/58.jpg"
    }
  },
  {
    "type": "WKE",
    "customer": {
      "id": 59,
      "first_name": "Alston",
      "last_name": "Douglas",
      "photoUrl": "https://randomuser.me/api/portraits/women/59.jpg"
    }
  },
  {
    "type": "WKE",
    "customer": {
      "id": 60,
      "first_name": "Nanette",
      "last_name": "Mcmahon",
      "photoUrl": "https://randomuser.me/api/portraits/women/60.jpg"
    }
  },
  {
    "type": "BRD",
    "customer": {
      "id": 61,
      "first_name": "Suarez",
      "last_name": "Montoya",
      "photoUrl": "https://randomuser.me/api/portraits/men/61.jpg"
    }
  },
  {
    "type": "BRD",
    "customer": {
      "id": 62,
      "first_name": "Leila",
      "last_name": "Stark",
      "photoUrl": "https://randomuser.me/api/portraits/women/62.jpg"
    }
  },
  {
    "type": "ACT",
    "customer": {
      "id": 63,
      "first_name": "Sims",
      "last_name": "Howe",
      "photoUrl": "https://randomuser.me/api/portraits/women/63.jpg"
    }
  },
  {
    "type": "WKA",
    "customer": {
      "id": 64,
      "first_name": "Lora",
      "last_name": "Solomon",
      "photoUrl": "https://randomuser.me/api/portraits/men/64.jpg"
    }
  },
  {
    "type": "ARQ",
    "customer": {
      "id": 65,
      "first_name": "Jamie",
      "last_name": "Warren",
      "photoUrl": "https://randomuser.me/api/portraits/women/65.jpg"
    }
  },
  {
    "type": "BRD",
    "customer": {
      "id": 66,
      "first_name": "Steele",
      "last_name": "Shepard",
      "photoUrl": "https://randomuser.me/api/portraits/women/66.jpg"
    }
  },
  {
    "type": "ARQ",
    "customer": {
      "id": 67,
      "first_name": "Erna",
      "last_name": "Chaney",
      "photoUrl": "https://randomuser.me/api/portraits/women/67.jpg"
    }
  },
  {
    "type": "ARQ",
    "customer": {
      "id": 68,
      "first_name": "Samantha",
      "last_name": "Todd",
      "photoUrl": "https://randomuser.me/api/portraits/women/68.jpg"
    }
  },
  {
    "type": "ARQ",
    "customer": {
      "id": 69,
      "first_name": "Norma",
      "last_name": "Singleton",
      "photoUrl": "https://randomuser.me/api/portraits/men/69.jpg"
    }
  },
  {
    "type": "WKA",
    "customer": {
      "id": 70,
      "first_name": "Deanne",
      "last_name": "Hines",
      "photoUrl": "https://randomuser.me/api/portraits/men/70.jpg"
    }
  },
  {
    "type": "ARQ",
    "customer": {
      "id": 71,
      "first_name": "Leanna",
      "last_name": "Mercado",
      "photoUrl": "https://randomuser.me/api/portraits/men/71.jpg"
    }
  },
  {
    "type": "WKA",
    "customer": {
      "id": 72,
      "first_name": "Miranda",
      "last_name": "Blair",
      "photoUrl": "https://randomuser.me/api/portraits/women/72.jpg"
    }
  },
  {
    "type": "ARQ",
    "customer": {
      "id": 73,
      "first_name": "Beach",
      "last_name": "Boyd",
      "photoUrl": "https://randomuser.me/api/portraits/men/73.jpg"
    }
  },
  {
    "type": "WKA",
    "customer": {
      "id": 74,
      "first_name": "Louisa",
      "last_name": "Carrillo",
      "photoUrl": "https://randomuser.me/api/portraits/women/74.jpg"
    }
  },
  {
    "type": "APT",
    "customer": {
      "id": 75,
      "first_name": "Booker",
      "last_name": "Hernandez",
      "photoUrl": "https://randomuser.me/api/portraits/men/75.jpg"
    }
  },
  {
    "type": "APT",
    "customer": {
      "id": 76,
      "first_name": "Reyna",
      "last_name": "Stewart",
      "photoUrl": "https://randomuser.me/api/portraits/women/76.jpg"
    }
  },
  {
    "type": "ACT",
    "customer": {
      "id": 77,
      "first_name": "Brittney",
      "last_name": "Daugherty",
      "photoUrl": "https://randomuser.me/api/portraits/men/77.jpg"
    }
  },
  {
    "type": "BRD",
    "customer": {
      "id": 78,
      "first_name": "Jenna",
      "last_name": "Silva",
      "photoUrl": "https://randomuser.me/api/portraits/men/78.jpg"
    }
  },
  {
    "type": "BRD",
    "customer": {
      "id": 79,
      "first_name": "Kaufman",
      "last_name": "Vega",
      "photoUrl": "https://randomuser.me/api/portraits/women/79.jpg"
    }
  },
  {
    "type": "MSG",
    "customer": {
      "id": 80,
      "first_name": "Rosales",
      "last_name": "Moreno",
      "photoUrl": "https://randomuser.me/api/portraits/women/80.jpg"
    }
  },
  {
    "type": "MSG",
    "customer": {
      "id": 81,
      "first_name": "Hebert",
      "last_name": "Albert",
      "photoUrl": "https://randomuser.me/api/portraits/women/81.jpg"
    }
  },
  {
    "type": "ACT",
    "customer": {
      "id": 82,
      "first_name": "Owen",
      "last_name": "Richard",
      "photoUrl": "https://randomuser.me/api/portraits/men/82.jpg"
    }
  },
  {
    "type": "APT",
    "customer": {
      "id": 83,
      "first_name": "Irwin",
      "last_name": "Mckay",
      "photoUrl": "https://randomuser.me/api/portraits/men/83.jpg"
    }
  },
  {
    "type": "ARQ",
    "customer": {
      "id": 84,
      "first_name": "Page",
      "last_name": "Garcia",
      "photoUrl": "https://randomuser.me/api/portraits/women/84.jpg"
    }
  },
  {
    "type": "MSG",
    "customer": {
      "id": 85,
      "first_name": "Cathy",
      "last_name": "Vang",
      "photoUrl": "https://randomuser.me/api/portraits/men/85.jpg"
    }
  },
  {
    "type": "ACT",
    "customer": {
      "id": 86,
      "first_name": "Hatfield",
      "last_name": "Gross",
      "photoUrl": "https://randomuser.me/api/portraits/women/86.jpg"
    }
  },
  {
    "type": "ACT",
    "customer": {
      "id": 87,
      "first_name": "Beverley",
      "last_name": "Clayton",
      "photoUrl": "https://randomuser.me/api/portraits/women/87.jpg"
    }
  },
  {
    "type": "MSG",
    "customer": {
      "id": 88,
      "first_name": "Marlene",
      "last_name": "Rasmussen",
      "photoUrl": "https://randomuser.me/api/portraits/women/88.jpg"
    }
  },
  {
    "type": "ARQ",
    "customer": {
      "id": 89,
      "first_name": "Liza",
      "last_name": "Carney",
      "photoUrl": "https://randomuser.me/api/portraits/women/89.jpg"
    }
  },
  {
    "type": "MSG",
    "customer": {
      "id": 90,
      "first_name": "Kasey",
      "last_name": "Wyatt",
      "photoUrl": "https://randomuser.me/api/portraits/men/90.jpg"
    }
  },
  {
    "type": "APT",
    "customer": {
      "id": 91,
      "first_name": "Huff",
      "last_name": "Cortez",
      "photoUrl": "https://randomuser.me/api/portraits/women/91.jpg"
    }
  },
  {
    "type": "WKE",
    "customer": {
      "id": 92,
      "first_name": "Cruz",
      "last_name": "Love",
      "photoUrl": "https://randomuser.me/api/portraits/women/92.jpg"
    }
  },
  {
    "type": "WKA",
    "customer": {
      "id": 93,
      "first_name": "Riley",
      "last_name": "Ballard",
      "photoUrl": "https://randomuser.me/api/portraits/women/93.jpg"
    }
  },
  {
    "type": "BRD",
    "customer": {
      "id": 94,
      "first_name": "Grace",
      "last_name": "Duncan",
      "photoUrl": "https://randomuser.me/api/portraits/men/94.jpg"
    }
  },
  {
    "type": "WKE",
    "customer": {
      "id": 95,
      "first_name": "Tonia",
      "last_name": "Austin",
      "photoUrl": "https://randomuser.me/api/portraits/men/95.jpg"
    }
  },
  {
    "type": "WKE",
    "customer": {
      "id": 96,
      "first_name": "Fowler",
      "last_name": "Villarreal",
      "photoUrl": "https://randomuser.me/api/portraits/women/96.jpg"
    }
  },
  {
    "type": "WKA",
    "customer": {
      "id": 97,
      "first_name": "Lina",
      "last_name": "Finley",
      "photoUrl": "https://randomuser.me/api/portraits/women/97.jpg"
    }
  },
  {
    "type": "APT",
    "customer": {
      "id": 98,
      "first_name": "Lisa",
      "last_name": "Bowers",
      "photoUrl": "https://randomuser.me/api/portraits/women/98.jpg"
    }
  },
  {
    "type": "ACT",
    "customer": {
      "id": 99,
      "first_name": "Hull",
      "last_name": "Summers",
      "photoUrl": "https://randomuser.me/api/portraits/men/99.jpg"
    }
  }
].map(feed => {
  var new_date = new Date();
  new_date.setDate(new_date.getDate() - 5  + (Math.floor((Math.random() * 10) + 1)));
  feed.customer.target_date = new_date;
  return feed;
}).sort((feed1, feed2) => ( feed2.customer.target_date - feed1.customer.target_date ));

export default DashboardWithoutMutation;
