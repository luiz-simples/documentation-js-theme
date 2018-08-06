'use strict'

const React = require('react')
const Radium = require('radium')
const Header = require('./header')
const Nav = require('./navigation')
const Content = require('./content')
const {lineHeight} = require('./styles')
const Utils = require('../utils')
const {StyleRoot} = Radium
const {Container, Column, Row} = require('radium-bootstrap-grid')

const hasMembers = (doc) => {
  const m = doc.members
  return m.static.length > 0 ||
         m.instance.length > 0 ||
         (m.events && m.events.length > 0)
}

const App = ({options, docs}) => {
  const containerStyle = {
    paddingTop: lineHeight(4)
  }

  const navItems = docs.map((doc) => {
    return {
      name: doc.name,
      members: hasMembers(doc) ? doc.members : null
    }
  })

  const utils = new Utils(options, docs)
  const radiumConfig = {
    userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
  }
  return (
    <StyleRoot radiumConfig={radiumConfig}>
      <Header
        name={options.name}
        version={options.version}
        project={options.project} />

      <Container style={containerStyle}>
        <Row>
          <Column lg={3} md={3} sm={3} ms={3} xs={3}>
            <Nav
              items={navItems}
              utils={utils}
            />
          </Column>

          <Column lg={9} md={9} sm={9} ms={9} xs={9}>
            <Content
              docs={docs}
              utils={utils}
            />
          </Column>
        </Row>
      </Container>
    </StyleRoot>
  )
}

module.exports = Radium(App)
