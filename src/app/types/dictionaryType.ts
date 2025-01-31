type Dictionary = {
  header: { home: string; about: string; blog: string };
  footer: string;
  home: { title: string; job: string; location: string; stack: string; hobbies: string };
  about: { intro: string; uni: {title: string; desc: string}; netbuilder: {title: string; desc: string}; gfk: {title: string; desc: string}; };
  blog : { title: string; back: string };
  errors: { notFound: string; resourceNotFound: string; returnHome: string};
  metadata: { layout: {title: string; desc: string;}; home: {title: string; desc: string;}; about: {title: string; desc: string;}; blog: {title: string; desc: string;} }
};
