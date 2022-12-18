---
sidebar_position: 1
---

We use [Git](https://git-scm.com/) as version control system. Installation
instructions can be found on the [Git website](https://git-scm.com/downloads).

After installing Git, you should configure your name and email address. This is
required to commit changes to the repository.

```bash
git config --global user.name "John Doe"
git config --global user.email "some@email.com"
```

Repositories should optimally be cloned using SSH. This requires a few additional
steps.

## SSH Keys

We use SSH keys to authenticate with GitLab. If you don't have an SSH key yet,
you can generate one with the following command:

```bash
ssh-keygen
```

This will generate a public and private key in the
`C:\Users\YOUR_USERNAME\.ssh\` directory. The public key is called `id_rsa.pub`.
If you open this file using a text editor, you will see a long string of
characters. This is your public key.

You can now add the public key to your GitLab account. Go to your GitLab
[profile settings](https://gitlab.com/-/profile/keys), paste the public key into
the text field and click on the "Add key"

## Git Client

There are many different Git clients available. We recommend using the
[TortoiseGit](https://tortoisegit.org/) client for Windows. It integrates nicely
with Windows Explorer. Some additional configuration is required to use SSH keys
with TortoiseGit. If you right-click on any folder in Windows Explorer, you will
see a new menu item called "TortoiseGit". Click on it and select "Settings". In
the "Network" tab, you can configure the SSH client. Select "Browse" and select
the `C:\Program Files\Git\usr\bin\ssh.exe` file. You should then be able to
clone repositories using SSH.

Next to this, the built-in Git client of Visual Studio Code is also a good
alternative, which should work out of the box.
