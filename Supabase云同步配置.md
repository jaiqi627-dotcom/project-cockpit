# Supabase云同步配置

## 作用

电脑端、Android端和公司浏览器连接同一条云端记录：

- 项目、阶段、行动、风险和文字记录会在浏览器内加密，再约15秒自动同步。
- 断网时继续保存在本机，恢复网络后自动上传。
- 照片、PPT、Excel等大型附件仍通过同步包、QQ或数据线传输。

## 一次性配置

1. 打开 `https://supabase.com`，注册并创建免费项目。
2. 进入项目的 `SQL Editor`。
3. 执行下面的SQL：

```sql
create table if not exists public.cockpit_state (
  sync_id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.cockpit_state enable row level security;

create policy "cockpit select"
on public.cockpit_state for select
to anon
using (true);

create policy "cockpit insert"
on public.cockpit_state for insert
to anon
with check (true);

create policy "cockpit update"
on public.cockpit_state for update
to anon
using (true)
with check (true);
```

4. 在Supabase的 `Project Settings -> API` 中取得：
   - Project URL
   - anon public key
5. 在电脑项目驾驶舱中打开“云同步设置”，粘贴以上两项并生成个人同步码。
6. 设置一条自己能够记住的“同步密码”。
7. 在手机APP和其他电脑浏览器中填入完全相同的四项内容。
8. 各端勾选“启用每15秒自动同步”，点击“立即同步测试”。

## 使用注意

- 同步码应使用系统生成的长随机值，不要使用姓名或手机号。
- 同步密码只保存在各设备本机；云端仅保存AES-GCM加密后的内容。忘记密码后无法解密云端内容。
- 电脑和手机修改同一项目时，以最后保存的一端为准。
- Supabase的anon key可以用于客户端连接，但不要使用service role key。
