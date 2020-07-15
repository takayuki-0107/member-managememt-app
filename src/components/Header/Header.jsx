import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { signOut } from '../../reducks/users/operation';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../../reducks/users/selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    margin: theme.spacing.unit,
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar position="fixed" className={classes.flex}>
          <Typography component="h1" variant="title">
            メンバー管理アプリ
          </Typography>
          {uid ? (
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => dispatch(signOut())}
            >
              ログアウト
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
