# Patching Software with GitOps, Helm, and Argo CD

This is a minor upgrade. Major upgrades are harder.

[Argo CD] deploys whatever is on `main`.

1. Pull the repo and open a new branch.

   ```console,editable
   cd ~/git/forgejo
   git pull
   git switch -c ariadne/forgejo-17.3.2
   ```

1. Render the current chart and build an old template with Helm.

   ```console,editable
   helm dependency build chart
   helm template forgejo chart -n forgejo > forgejo-old.yaml
   ```

1. Change the software version (this is the upgrade step).

   ```console,editable
   sed -i 's/version: 17.1.1/version: 17.3.2/' chart/Chart.yaml
   ```

1. Render the updated chart and build a new template with Helm.

   ```console,editable
   helm dependency update chart
   helm template forgejo chart -n forgejo > forgejo-new.yaml
   ```

1. Diff the templates

   This is a sanity check step, Helm requires new `Chart.yaml`, and `Chart.lock` files.

   ```
   diff forgejo-old.yaml forgejo-new.yaml | less
   ```
   
1. Removed the templates

   These don't get deployed, only checked.

   ```
   rm forgejo-old.yaml 
   rm forgejo-new.yaml
   ```

1. Commit `Chart.yaml`, and `Chart.lock`
   ```console,editable
   git add chart/Chart.yaml chart/Chart.lock
   git commit -m "Minor upgrade: Forgejo 15.0.3 to 15.0.11"
   git push -u origin ariadne/forgejo-17.3.2
   ```

1. Open a PR (or merge to `main`)

   Fast-forward ... I'll merge into main on my own repo.

   ```console,editable
   git fetch origin
   git checkout main && git pull --ff-only
   git merge --ff-only origin/ariadne/forgejo-17.3.2
   git push origin main
   ```

1. Check kubectl to see if it deployed.

   ```console,editable
   !
   ! Skip the wait with refresh=hard
   !
   kubectl -n argocd annotate app forgejo argocd.argoproj.io/refresh=hard --overwrite
   kubectl -n argocd get app forgejo -w
   kubectl -n forgejo rollout status deploy/forgejo
   ```

## Rolling back

   ```console,editable
   git revert HEAD
   git push origin main
   ```

## References

[Helm](https://helm.sh/)

[Helm Dependency Update](https://helm.sh/docs/helm/helm_dependency_update/)

[Forgejo Helm Chart](https://code.forgejo.org/forgejo-helm/forgejo-helm)

[Argo CD]: https://argo-cd.readthedocs.io/
