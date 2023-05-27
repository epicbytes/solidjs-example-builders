const templateRegx = /\{([^}]+)\}/g;

export const StringFromTemplate = function (string, d) {
  return string.replace(templateRegx, function (m, n) {
    let o = d;
    const p = n.split("|")[0].split(".");
    for (let i = 0; i < p.length; i++) {
      o = typeof o[p[i]] === "function" ? o[p[i]]() : o[p[i]];
      if (typeof o === "undefined" || o === null)
        return n.indexOf("|") !== -1 ? n.split("|")[1] : "";
    }
    return o;
  });
};

export const ObjectFromTemplate = (
  sourceObject: Record<string, any>,
  fieldMappingObject: Record<string, any>
) => {
  return Object.fromEntries(
    Object.entries(sourceObject).map(([k, v]) => [
      k,
      typeof v === "string" ? StringFromTemplate(v, fieldMappingObject) : v,
    ])
  );
};

export const ObjectfromPath = (obj, path) => {
  return path.split(".").reduce((acc, c) => acc && acc[c], obj);
};
