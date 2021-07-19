// == Import
import React from 'react';

// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';

// data, styles et utilitaires
import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './styles.scss';

// == Composant
class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modeZen: false,
    };
    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme() {
    const { modeZen } = this.state;
    console.log('changement de theme');
    this.setState({
      modeZen: !modeZen,
    });
  }

  render() {
    console.log(categoriesData);
    console.log(postsData);
    const { modeZen } = this.state;

    return (
      <div className="blog">
        <Header categoriesData={categoriesData} changeTheme={this.changeTheme} modeZen={modeZen} />
        <Posts postsData={postsData} modeZen={modeZen} />
        <Footer />
      </div>
    );
  }
}

// == Export
export default Blog;
