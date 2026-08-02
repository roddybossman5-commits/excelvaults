import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PageHeader.scss';

/** Title band + breadcrumb the live site puts at the top of every inner page. */
export default function PageHeader({ title }) {
  return (
    <div className="page-header">
      <div className="container">
        <h1 className="page-header__title">{title}</h1>
        <p className="page-header__crumbs">
          <Link to="/">Excelvaults</Link> <span>&gt;</span> {title}
        </p>
      </div>
    </div>
  );
}
