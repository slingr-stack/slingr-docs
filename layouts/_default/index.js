var docs = [
{{ range $index, $page := (where .Site.Pages "Section" "docs") -}}
  {
    id: {{ $index }},
    title: "{{ .Title }}",
    description: "{{ .Params.lead }}",
    href: "{{ .URL | relURL }}"
  },
{{ end -}}
];