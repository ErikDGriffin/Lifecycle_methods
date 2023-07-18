import { Component } from 'react'; // desstructured component
import FilmsList from './components/FilmsList';

class FilmsList extends Component { 
  constructor() { 
    super();
    this.state = { 
    };
  }

  getFilms = () => {
    fetch('https://studioghibliapi-d6fc8.web.app/films')
      .then((response) => response.json())
      .then((result) => this.setState({ list: result }))
      .catch((error) => console.error(error));
  };

  componentDidMount() {
    this.getFilms();
  }

  render() { 
    return (
      <div>
        <ul>
          {this.state.list.map((film) => (
            <li key={film.id}>{film.title}</li>
          ))}
        </ul>
        <FilmsList/>
      </div>
    );
  }
}

export default FilmsList;


