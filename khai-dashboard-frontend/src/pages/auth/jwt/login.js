import NextLink from 'next/link';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import { Box, Button, Link, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as AuthLayout } from '../../../layouts/auth/modern-layout';
import { paths } from '../../../paths';
import { useRouter } from 'next/router';
import { useMounted } from '../../../hooks/use-mounted';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../../hooks/use-auth';

const initialValues = {
  username: '',
  password: '',
  submit: null,
};

const useParams = () => {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || undefined;

  return {
    returnTo,
  };
};

const validationSchema = Yup.object({
  username: Yup.string()
    //.email('Must be a valid email')
    .max(255)
    .required('Username is required'),
  password: Yup.string().max(255).required('Password is required'),
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const { returnTo } = useParams();
  const { issuer, signIn } = useAuth();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await signIn(values.username, values.password);

        if (isMounted()) {
          router.push(returnTo || paths.dashboard.index);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  // useEffect(() => {
  //   debugger;

  //   }, []);

  return (
    <div>
      <Box sx={{ mb: 4 }}></Box>
      <Stack sx={{ mb: 4 }}
spacing={1}>
        <Typography variant="h5">Log in</Typography>
      </Stack>
      <form noValidate
onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            autoFocus
            error={!!(formik.touched.username && formik.errors.username)}
            fullWidth
            helperText={formik.touched.username && formik.errors.username}
            label="Username"
            name="username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="username"
            value={formik.values.username}
          />
          <TextField
            error={!!(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
          />
        </Stack>
        <Button fullWidth
sx={{ mt: 3 }}
size="large"
type="submit"
variant="contained">
          Log in
        </Button>
        <Box sx={{ mt: 3 }}>
          <Link href="#"
underline="hover"
variant="subtitle2">
            Forgot password?
          </Link>
        </Box>
      </form>
    </div>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
