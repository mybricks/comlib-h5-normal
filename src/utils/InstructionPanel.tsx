export default function ({ content = "", links = [] }) {
  const Markdown = () => {
    return (
      <div style={{ fontSize: 12 }}>
        {content ? <div style={{ opacity: 0.7 }}>{content}</div> : null}

        {links.length ? (
          <div className="section">
            <div style={{ fontWeight: 500, marginTop: 6, opacity: 0.7 }}>
              更多参考链接：
            </div>
            <div className="content">
              <ul>
                {links.map((link) => (
                  <li key={link.href}>
                    <a href={link.url} target="_blank">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return [
    {},
    {
      title: "",
      type: "editorRender",
      options: {
        render: Markdown,
      },
    },
  ];
}
