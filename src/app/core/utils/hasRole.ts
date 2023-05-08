export function containRoles(token: string, routeRoles: string[]) {
  const dehash = atob(token?.split('.')[1]) as string;
  const rolesAsString: { scope: string; } = JSON.parse(dehash);
  const claim = (rolesAsString.scope as string).split(' ');
  return claim.some(role => routeRoles.includes(role));
}
