import React from "react"
import { Link } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import Toggle from "react-toggle"
import { rhythm, scale } from "../utils/typography"
import "./global.css"
import "./Toggle.css"
import sun from "../assets/sun.png"
import moon from "../assets/moon.png"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: 0,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--textNormal)",
      }}
    >
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: rhythm(1.5),
          }}
        >
          {header}
          <ThemeToggler>
            {({ toggleTheme, theme }) => {
              const isDarkMode = theme === "dark"

              return (
                <Toggle
                  defaultChecked={isDarkMode}
                  icons={{
                    checked: (
                      <img
                        src={moon}
                        role="presentation"
                        style={{ pointerEvents: "none" }}
                      />
                    ),
                    unchecked: (
                      <img
                        src={sun}
                        role="presentation"
                        style={{ pointerEvents: "none" }}
                      />
                    ),
                  }}
                  onChange={e => toggleTheme(isDarkMode ? "light" : "dark")}
                />
              )
            }}
          </ThemeToggler>
        </header>

        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </div>
  )
}

export default Layout
